#!/bin/bash 
node /home/notroot/.gnubg/matches/pull.js
for filename in /home/notroot/.gnubg/matches/*.match; do
	[ -e "$filename" ] || continue
	echo "Analysing $filename.";
	gnubg -t $filename -c /home/notroot/.gnubg/matches/commands;
	echo "Done. $filename added to database.";
	mv "$filename" "/home/notroot/.gnubg/matches/analysed/";
done
