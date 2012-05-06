#!/usr/bin/perl -wT

# FastCGI enabled perl script acting as the REST API returning JSON to results
# from rainfall_stats which have been loaded into a MongoDB.
#
# CSV reports generated using report-using-file-glob.sh can be imported into
# MongoDB using the import-csv-stats-to-mongodb.sh script.


# This file is licensed CC0 by Andrew Harvey <andrew.harvey4@gmail.com>
#
# To the extent possible under law, the person who associated CC0
# with this work has waived all copyright and related or neighboring
# rights to this work.
# http://creativecommons.org/publicdomain/zero/1.0/


use strict;
use MongoDB;
use JSON;
use CGI::Fast;
use DateTime;

# needed to force the $q_time_start and $q_time_end to behave as numbers
# read the module documentation for details
$MongoDB::BSON::looks_like_number = 1;

# connect to mongodb
my $conn = MongoDB::Connection->new;
my $db   = $conn->bom;
my $coll = $db->rainfall_radar;

# FastCGI loop
while (my $q = new CGI::Fast) {
  # grab parameters
  my $q_radar = $q->param('radar');
  my $q_time_start = $q->param('datetime_start');
  my $q_time_end = $q->param('datetime_end');

  # check format of query parameters is expected
  if (!(defined $q_radar && ($q_radar =~ /^IDR\d{3}$/) &&
       defined $q_time_start && ($q_time_start =~ /^\d{12}$/) &&
       defined $q_time_end && ($q_time_end =~ /^\d{12}$/)
     )) {
    print $q->header(-status => '400', -type => 'text/plain');
    print "Unexpected query\n";
    exit;
  }

  # query the database
  my $query_result = $coll->find({
      'radar' => $q_radar,
      'datetime' => { '$gte' => $q_time_start, '$lte' => $q_time_end } # because datetime is stored as a Number in the format YYYYMMDDHHMM, numeric > and < work.
    });

  # put results into perl data structure without the _id
  my @reduced_rows;
  while (my $row = $query_result->next) {
    my %reduced_row_hash;
    foreach my $k (keys $row) {
      if ($k ne "_id") {
        $reduced_row_hash{$k} = $row->{$k};
      }
    }
    push @reduced_rows, \%reduced_row_hash;
  }

  # write out over HTTP / serialise to JSON
  print "Content-Type: text/json\n";
  print "\n";
  print encode_json(\@reduced_rows)."\n";
}

