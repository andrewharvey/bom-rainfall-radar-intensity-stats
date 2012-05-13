#!/usr/bin/perl -w

use strict;

print "Date,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1\n";

<>; #chew headerline

while (<>) {
  chomp;
  if ($_ =~ /([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*)/) {
    my $datetime = $2;
    my @values = ($3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);

    my $new_datetime;
    if ($datetime =~ /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})$/) {
      $new_datetime = "$1/$2/$3 $4:$5:00";
    }else{
      die "Unexpected datetime format\n";
    }
    my @agg_values;
    for (my $i = 1; $i <= 15; $i++) {
      my $new = 0;
      for (my $j = $i; $j <= 15; $j++) {
        $new += $values[$j-1];
      }
      push @agg_values, $new;
    }
    print "$new_datetime," . join(',', reverse(@agg_values)) . "\n";
  }
}
