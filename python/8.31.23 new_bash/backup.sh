#!/bin/bash
# Check if "my_backup_folder" exists
if [ -d "my_backup_folder" ]; then
	# Check if "bf.sh" exists in "my_backup_folder"
	if [ -f "my_backup_folder/bf.sh" ]; then
		# Compare the contents of "bf.sh" with the original content
		if cmp -s "my_backup_folder/bf.sh" "bf.sh"; then
			echo "Well done! 'my_backup_folder' exists, 'bf.sh' was

copied, and its contents match the original."
	else
		echo "Oops, something went wrong. 'bf.sh' contents in

'my_backup_folder' do not match the original."
		fi
	else
		echo "Oops, something went wrong. 'bf.sh' was not found in
'my_backup_folder'."
	fi
else
	echo "Oops, something went wrong. 'my_backup_folder' was not found."
fi
