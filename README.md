# Documentation

## Git

### Organisation
The both the frontend and backend components of the assignment are in the same repo. <br>
The server side code is contained in the 'backend' directory and the frontend code is in the 'frontend' directory.

### Branching

Branches from main were created when implementing each feature e.g. to implement a frontend service a branch would be created named `feature/frontend-service-name`. <br> This branch would be developed until the feature was able to be tested and confirmed working at which point it would be merged back into the main branch. <br>
Branches were made for components, documentation, services and models for development.

### Updates
Regular commits would be made to the local/remote repositories when reasonable progress had been made towards the current implementation goal such as a particular function was drafted without error warnings (but has yet to be tested). <br>

## Data Structures

In phase one there is no database implementation and as such the entities must be represented as exported classes with typescript. The models are made on the frontend such that objects can be generated, parsed, stored and retrieved in a consistent manner to the local browser storage. They are located in the `frontend/src/app/models` directory.

### User

A user model represents every user registered in the system that has capabilities to perform tasks. These tasks are dependent on the users' roles. <br>
The attribtues are as follows: <br>

`id:` A unique number identifier of the registered user that can be used as a primary key. 

`username:` A recognisable string alias the user chooses to go by on the ChatApp. <br>

`email:` A string containing the email a user has registered with <br>

`password:` A string containing the user's password for authentication <br>

`roles:` An array containing the string name of the roles a specific user has that determines their permissions at various points in the app. There can be many roles to this one user. A string was used as it was assumed the role names would not be modified 

`groups:` An array containing the group ID numbers that a user is part of. A user can be part of many groups. An ID was used too allow for group names to change.<br>

### Group

A group model represents a group that a User can join to engage with other users through channels. The properties of a group are as follows: <br>

<br>

`id:` A unique number identifier of the group that can be used as a primary key. 


`name:` A string identifier for the group that should also be unique. 

`memberId:` An array of numbers representing the unique Ids of each registered group member 

`pendingUserId:` An array of numbers with the unique identifiers of all users currently applying to join the group. 


`adminId:` An array of numbers that represent the unique identifier of the admins of this group. 

`channelId:` An array of numbers that represent the unique identifier of all the channels made within this group. 


`detailsOpen?:` An optional property used in certain components that allow for inspecting more details about the group. 
<


### Channel

A channel is a space created within a group where users can join to engage in chat, voice and video conversations with each other. The properties of a channel are as follows:

`id:` A channel has number associated with it to be a unique identifier.

`name:` A channel has a name string associated with it that should be unique within the group that it was made.

`bannedId:` A channel has an array of numbers that represent users that have been banned from that channel.

`groupId:` A channel is associated with 1 group and has that group's unique identifier stored.

`activeUsers:` A channel can have many active users within it at any given time. An active user is a member of the group that is currently using the channel to chat in.

### GroupAdmin



## Angular

## Node Server

## Client-Server Interactions

