require 'net/http'
require 'json'
module Jekyll
  class YandexMetrika < Liquid::Tag
    def initialize(tag_name, params, token)
      super
      @cfg = Jekyll.configuration({})['yandex_metrika']
      @token = @cfg['token']
      @site_url = @cfg['site_url']
      @trim_last = @cfg['trim_last']
      @trim_last_reversed = @trim_last.reverse
    end

    def render(context)
      url = 'https://api-metrika.yandex.ru/stat/v1/data?metrics=ym:pv:users&ids=54261154&dimensions=ym:pv:title,ym:pv:URL'
      uri = URI(url)
      req = Net::HTTP::Get.new(uri)

      req['Authorization'] = "OAuth #{@token}"
      req['Content-Type'] = "application/x-yametrika+json"

      response = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => true) {|http|
        http.request(req)
      }

      result = JSON.parse(response.body.force_encoding(Encoding::UTF_8))

      output_map = {}

      result['data'].each {|item|
        dim = item['dimensions']
        title = dim[0]['name'].reverse.sub(@trim_last_reversed, '').reverse
        url = dim[1]['name'].split('#')[0]

        if @site_url != url and not output_map.key?(url)
          output_map[url] = title
        end
      }

      output = ''

      output_map.each do |href, title|
        output = "#{output}<a href=\"#{href}\">#{title}</a><br/>"
      end

      output
    end
  end
end

Liquid::Template.register_tag('ym', Jekyll::YandexMetrika)