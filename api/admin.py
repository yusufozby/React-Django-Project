from django.contrib import admin
from .models import *

admin.site.register(AccountModel)
admin.site.register(twitsModel)
admin.site.register(Likes)
admin.site.register(Followings)