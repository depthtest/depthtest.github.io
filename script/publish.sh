#!/bin/bash

pushd dist/JOjedaWebProject
git init
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git add .
git commit -m "deployed for ${GITHUB_SHA}"
git push -f https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git master:production
popd