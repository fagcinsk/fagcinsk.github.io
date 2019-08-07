module Jekyll
  module Mod
    require 'exifr'
    require 'exifr/jpeg'
    module ExifData
      def exif(input, exif_tag)
        exif = EXIFR::JPEG::new(input)
        exif_tag.split('.').inject(exif) {|exif, tag|
          exif == nil ? nil : exif.send(tag)
        } || ""
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::Mod::ExifData)