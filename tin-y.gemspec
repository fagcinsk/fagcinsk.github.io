# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "tin-y"
  spec.version       = "0.1.0"
  spec.authors       = ["Mikhail Yudin"]
  spec.email         = ["fagci.nsk@gmail.com"]

  spec.summary       = "Minimal theme"
  spec.homepage      = "http://willbelater.soon"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.8"
  spec.add_runtime_dependency "kramdown"

  spec.add_development_dependency "bundler"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.3"
  spec.add_runtime_dependency "jekyll-feed"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.1"
  spec.add_development_dependency "rake", "~> 12.0"
end
