from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

class TwitsSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = twitsModel
        fields = ('id','twit','createdBy','twitImg')
       
        depth=3

class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        
        model = AccountModel
        fields = ('id','Address','profileImg','description','user','accountName')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
     
        depth=1

    
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
      
        model = User
        fields = ['id', 'username', 'password','email']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        depth=1       
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")
class LikesSerializer(serializers.ModelSerializer):
    
    class Meta:
      
        model = Likes
        fields = ['id','sharing','like','likeId']
       
        depth=4             
class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followings
        fields = ['id','follower','followed','followerId'] 
        depth=4       


class ChangePasswordSerializer(serializers.Serializer):
   
    class Meta:
        model = AccountModel
        fields = ['id','user']

    depth=2       