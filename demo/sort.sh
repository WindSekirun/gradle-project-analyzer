jq '. | sort_by(.name)' "demo-functions.json" > demo-functions-sorted.json
rm -rf demo-functions.json
mv demo-functions-sorted.json demo-functions.json