#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
bundle exec rake db:migrate
# ./bin/rails assets:precompile
# ./bin/rails assets:clean