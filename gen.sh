#!/bin/bash
input="member.txt"
while IFS= read -r name
do
	echo Gen branch $name
	git branch $name
	git push origin $name
done < $input
