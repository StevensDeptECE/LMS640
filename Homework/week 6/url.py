from django.conf.urls.defaults import *

urlpatterns = patterns('',
	(r'^$','sites.lab.views.index'),
	(r'^news/$','sites.lab.views.news_list'),
	(r'^search/$','sites.lab.views.upper'),
	(r'^count_sequence/$','sites.lab.views.download_seq'),
	(r'^news/article/(?P<news_id>\d+)/$','sites.lab.views.article'),
	(r'^(\w+)/$','sites.lab.views.page'),
)
