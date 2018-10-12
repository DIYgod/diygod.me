{% if not (theme.duoshuo and theme.duoshuo.shortname) and not theme.duoshuo_shortname %}
  {% if theme.disqus.enable %}

    {% if page.comments %}
      <script type="text/javascript">
        var disqusjs = [];
        disqusjs.config = {
          shortname: '{{ theme.disqus.shortname }}',
          identifier: '{{ page.path }}',
          url: '{{ page.permalink }}',
          api: '{{ theme.disqus.api }}',
          apikey: '{{ theme.disqus.apikey }}',
          admin: '{{ theme.disqus.admin }}',
          adminLabel: '{{ theme.disqus.adminLabel }}',
        };
      </script>
    {% endif %}

  {% endif %}
{% endif %}
