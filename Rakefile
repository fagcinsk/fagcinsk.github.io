# encoding: utf-8

require 'rubygems'
require 'rake'
require 'fileutils'
require 'tempfile'
require 'rake/clean'
require 'html-proofer'

task default: [
    :clean,
    :build,
    :proofer,
]

def done(msg)
    puts msg + "\n\n"
end

desc 'Build Jekyll site'
task :build do
  if File.exist? '_site/'
    puts 'Jekyll site already exists in _site (run "rake clean" first)'
  else
    puts 'Building Jekyll site...'
    system('jekyll build --trace') or fail "Jekyll failed with #{$CHILD_STATUS}"
    done 'Jekyll site generated without issues'
  end
end

desc 'Delete _site directory'
task :clean do
  rm_rf '_site/'
  rm_rf '.sass-cache/'
  rm_rf '.jekyll-metadata/'
  rm_rf '.jekyll-cache/'
  rm_rf '_temp/'
  done 'Jekyll temporary files and directories deleted'
end

desc 'Validate a few pages through HTML proofer'
task proofer: [:build] do
  HTMLProofer.check_directory(
      '_site/',
      log_level: :warn,
      check_html: true,
      assume_extension: true,
      external_only: true, # fast fix for deploying new posts problem
      internal_domains: ['mikhail-yudin.ru']
  ).run
  done 'HTML passed through html-proofer'
end
