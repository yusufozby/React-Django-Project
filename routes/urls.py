from django.urls import path,re_path
from .views import *
from django.views.generic import TemplateView

urlpatterns = [
    re_path("./*",index,name="dadsa"),
    path("",index),
    path("user/",index),
    path("discover/",index),
    path("profile/",index),
    path("editprofile/",index),
    path("changepassword/",index),
    path("register/",index),
    path("login/",index),
    path("viewprofile/<int:id>/",viewProfile),
    
    

    

]

