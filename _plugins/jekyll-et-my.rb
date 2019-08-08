module Jekyll
  module Mod
    require 'exifr'
    require 'exifr/jpeg'
    module ExifData
      def exif(input, exif_tag)
        exif = EXIFR::JPEG::new(input)
        exif_tag.split('.').inject(exif) {|e, tag| e ? e.send(tag) : nil}
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::Mod::ExifData)