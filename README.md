# Documentation

## Git

### Organisation
The both the frontend and backend components of the assignment are in the same repo. <br>
The server side code is contained in the 'backend' directory and the frontend code is in the 'frontend' directory.

### Branching

Branches from main were created when implementing each feature e.g. to implement a frontend service a branch would be created named `feature/frontend-service-name`. <br> This branch would be developed until the feature was able to be tested and confirmed working at which point it would be merged back into the main branch. <br>

### Updates
Regular commits would be made to the local/remote repositories when reasonable progress had been made towards the current implementation goal such as a particular function was drafted without error warnings (but has yet to be tested). <br>

## Data Structures

In phase one there is no database implementation and as such the entities must be represented as exported classes with typescript. The models are made on the frontend such that objects can be generated, parsed, stored and retrieved in a consistent manner to the local browser storage. They are located in the `frontend/src/app/models` directory.

### User

A user model represents every user registered in the system that has capabilities to perform tasks. These tasks are dependent on the users' roles. <br>
The attribtues are as follows: <br>
<br>
`id:` A unique number identifier of the registered user that can be used as a primary key. <br>
<br>
`username:` A recognisable string alias the user chooses to go by on the ChatApp. <br>
<br>
`email:` A string containing the email a user has registered with <br>
<br>
`password:` A string containing the user's password for authentication <br>
<br>
`roles:` An array containing the string name of the roles a specific user has that determines their permissions at various points in the app. There can be many roles to this one user. A string was used as it was assumed the role names would not be modified <br>
<br>
`groups:` An array containing the group ID numbers that a user is part of. A user can be part of many groups. An ID was used too allow for group names to change.<br>

### Group

### Channel

### GroupAdmin

## Angular

## Node Server

## Client-Server Interactions

