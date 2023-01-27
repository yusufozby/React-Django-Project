from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.contrib.auth.models import User
from .models import *
from .serializers import *

@api_view(['POST'])
def createUser(request):
    
    Address = request.data["Address"]
    description = request.data["description"]
    accountName = request.data["accountName"]
    profileImg = request.data["profileImg"]
    user = User.objects.create_user(username=request.data["username"],password=request.data["password"],email=request.data["email"])
    user.save()
    new_Account =   AccountModel.objects.create(
    user = user,
    description = description,
    Address = Address,
    accountName = accountName,
    profileImg = profileImg
    )
    serializer = AccountSerializer(new_Account)
    return Response({"user":serializer.data})
@api_view(['GET'])
def getUsers(request):
    allusers = AccountModel.objects.all()
    serializer = AccountSerializer(allusers,many=True)
   
    return Response(serializer.data)    
@api_view(['POST'])
def updateProfile(request):
    
    data = request.data
    updatedAccount = AccountModel.objects.get(id=data["accountId"])
   
    updatedAccount.user = User.objects.get(id = data["userId"])
    updatedAccount.profileImg = request.data["profileImg"]
    
     
    
    updatedAccount.Address = data["Address"]
    updatedAccount.accountName = data["accountName"]
    updatedAccount.description = data["description"]

    updatedAccount.save()
    serializer = AccountSerializer(updatedAccount)
    return Response(serializer.data)


@api_view(['POST'])
def createTwit(request):
    
  


    twit = request.data["twit"]
      
    data = request.data
    twitImg = request.data["twitImg"]
    createdBy = AccountModel.objects.get(id=data["accountId"])
    
    

    
    new_Account =   twitsModel.objects.create(
        twit = twit,
        twitImg = twitImg,
        createdBy = createdBy
    )
    
    serializer = TwitsSerializer(new_Account)

    return Response({"sharedTwit":serializer.data})
@api_view(['GET'])
def getTwits(request):
    alltwits = twitsModel.objects.all()
    serializer = TwitsSerializer(alltwits,many=True)
    return Response(serializer.data)
@api_view(['GET'])
def getLikes(request):
    likes = Likes.objects.all()
    serializer = LikesSerializer(likes,many=True)
    return Response(serializer.data)
@api_view(['POST'])
def createLike(request):
    data =request.data
    like = data["like"]
    sharing = twitsModel.objects.get(id=data["twitId"])
    likeId= data["likeId"]
    new_like = Likes.objects.create(
         sharing = sharing,
         like = like,
         likeId = likeId
    )   
    serializer = LikesSerializer(new_like)
    return Response({"like":serializer.data})

@api_view(['POST'])
def createFollowing(request):
    data =request.data
    follower = data["follower"]
    followed = AccountModel.objects.get(id=data["accountId"])
    id = request.data["followerId"]
    new_following = Followings.objects.create(
        follower  = follower,
         followed = followed,
         followerId = id
    )   
    serializer = FollowSerializer(new_following)
    return Response({"like":serializer.data})

@api_view(['GET'])
def getFollowings(request):
    all_followings = Followings.objects.all()

    serializer = FollowSerializer(all_followings,many=True)
    return Response(serializer.data)
@api_view(['POST'])
def changePassword(request):
    data = request.data
    user = User.objects.get(id=data["accountId"])
    user.set_password(data["new_password"])
    
    
    user.save()
    serializer = ChangePasswordSerializer(user)
    return Response({"user":serializer.data})

def pagenotfound(request):
    return render(request,"pagenotfound.html")    




