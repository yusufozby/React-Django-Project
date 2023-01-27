from django.urls import path,re_path
from .views import *
from .api import *

urlpatterns = [
    path('createuser/',createUser,name="create-user"),
    path('getusers/',getUsers,name="get-users"),
    path('login/',LoginAPI.as_view()),
    path("updateprofile/",updateProfile,name="update-profile"),
    path("createtwit/",createTwit,name="create-twit"),
    path("gettwits/",getTwits,name="get-all-twits"),
    path("getlikes/",getLikes,name="get-all-likes"),
    path("createlike/",createLike,name="create-like"),
    path('createfollowing/',createFollowing,name="create-following"),
    path('getfollowings/',getFollowings,name="get-all-followings"),
    path('changepassword/',changePassword,name="change-password"),
    re_path('./*',pagenotfound,name="ewqewq")
    

    
]
