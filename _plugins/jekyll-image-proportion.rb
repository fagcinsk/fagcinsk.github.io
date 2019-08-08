module Jekyll
  module Mod
    require 'fastimage'
    module ImageProportion
      def proportion(input)
        width, height = FastImage.size(input)
        (width.to_f / height).round(2)
      end

      def dimensions(input)
        width, height = FastImage.size(input)
        "#{width}x#{height}"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::Mod::ImageProportion)