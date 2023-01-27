from django.db import models
from django.contrib.auth.models import User



    

class AccountModel(models.Model):
    accountName = models.CharField(max_length=300)
    Address = models.CharField(max_length=300)
   
      
    
    profileImg = models.TextField(null=True)
    description = models.TextField()
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
     

    def __str__(self):
        return self.accountName
class twitsModel(models.Model):
    twit = models.TextField(null=True)
    date = models.CharField(max_length=100)
    createdBy = models.ForeignKey(AccountModel,models.CASCADE,null=True)
    twitImg = models.TextField(null=True)
    def __str__(self):
        return self.twit

class Likes(models.Model):
    like = models.CharField(max_length=100)
    sharing = models.ForeignKey(twitsModel,models.CASCADE,null=True)
    likeId= models.IntegerField(null=True)        
    def __str__(self):
        return self.like
class Followings(models.Model):
    follower = models.CharField(max_length=100)
    followerId = models.IntegerField(null=True)
    followed = models.ForeignKey(AccountModel,models.CASCADE,null=True) 
    def __str__(self):
        return  self.follower       