# Documentation

# Git

## Organisation
The both the frontend and backend components of the assignment are in the same repo. <br>
The server side code is contained in the 'backend' directory and the frontend code is in the 'frontend' directory.

## Branching

Branches from main were created when implementing each feature e.g. to implement a frontend service a branch would be created named `feature/frontend-service-name`. <br> This branch would be developed until the feature was able to be tested and confirmed working at which point it would be merged back into the main branch. <br>
Branches were made for components, documentation, services and models for development.

## Updates
Regular commits would be made to the local/remote repositories when reasonable progress had been made towards the current implementation goal such as a particular function was drafted without error warnings (but has yet to be tested). <br>

# Data Structures

In phase one there is no database implementation and as such the entities must be represented as exported classes with typescript. The models are made on the frontend such that objects can be generated, parsed, stored and retrieved in a consistent manner to the local browser storage. They are located in the `frontend/src/app/models` directory.

## User

A user model represents every user registered in the system that has capabilities to perform tasks. These tasks are dependent on the users' roles. <br>
The attribtues are as follows: <br>

`id:` A unique number identifier of the registered user that can be used as a primary key. 

`username:` A recognisable string alias the user chooses to go by on the ChatApp. <br>

`email:` A string containing the email a user has registered with <br>

`password:` A string containing the user's password for authentication <br>

`roles:` An array containing the string name of the roles a specific user has that determines their permissions at various points in the app. There can be many roles to this one user. A string was used as it was assumed the role names would not be modified 

`groups:` An array containing the group ID numbers that a user is part of. A user can be part of many groups. An ID was used too allow for group names to change.<br>

## Group

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


## Channel

A channel is a space created within a group where users can join to engage in chat, voice and video conversations with each other. The properties of a channel are as follows:

`id:` A channel has number associated with it to be a unique identifier.

`name:` A channel has a name string associated with it that should be unique within the group that it was made.

`bannedId:` A channel has an array of numbers that represent users that have been banned from that channel.

`groupId:` A channel is associated with 1 group and has that group's unique identifier stored.

`activeUsers:` A channel can have many active users within it at any given time. An active user is a member of the group that is currently using the channel to chat in.

# Angular


# Services

## AuthService

AuthServices handles many authentication related tasks conducted from the frontend across different components.,

`getUserId()`

Returns the ID of the authenticated user by decoding the stored authentication token from session storage. If no token is present, it returns 0.

`isAuthenticated()`

Checks whether the user is currently authenticated by verifying if an authentication token exists in session storage.

`restoreUserRole()`

Restores the user's role from the current session. If the user is authenticated, it retrieves their role from the token and updates the currentUserRoleSubject.

`generateToken(user: any)`

Generates a simulated authentication token (in base64 format) for a user object. It encodes the user's ID, username, and roles for phase 1 implementation.

`getRoles()`

Extracts and returns the roles of the current user from the authentication token in session storage. If no roles are found, it returns an empty array.

`getUserById()`

Finds and returns the authenticated user by decoding the authentication token and searching through stored user data in local storage. If an error occurs or no user is found, it returns undefined.

`getPermissions()`

Returns the highest permission level of the authenticated user by checking their roles and comparing them to a priority list (SuperAdmin, GroupAdmin, user). If no matching role is found, it defaults to 'user'.

`findUser(username: string, password: string)`

A helper function that searches through the stored users (from UserService) and returns the user that matches the provided username and password.

`login(username: string, password: string)`

Handles user login by finding the user using the findUser method. If the user is found, it generates and stores an authentication token, updates the user's role, and returns true. Otherwise, it returns false.

`logout()`

Logs the user out by removing the authentication token from session storage, resetting the currentUserRoleSubject, and redirecting to the login page.

## GroupService

GroupServices handles many group related tasks such as CRUD across the diferent components.

`currentlyViewedGroup`

A BehaviorSubject that stores the currently viewed group. It allows the component to subscribe to changes in the viewed group.

`currentGroup$`

An observable for the currentlyViewedGroup that components can subscribe to, enabling reactive updates when the group changes.

`channelsSubject`

A BehaviorSubject that stores the list of channels. It is initialized using the getChannels method to retrieve stored channels.

`channels$`

An observable that emits changes to the channels list. Components can subscribe to this to update their UI when the channels list changes.

`updateChannels()`

A helper method that updates the channelsSubject by fetching the latest channels from local storage.

`getChannels()`

Retrieves all channels from local storage. If no channels are found, it returns an empty array.

`addChannelToGroup(groupId: number, channelId: number)`

Adds a channel to a group by updating the group's channelId array. It checks if the channel is already associated with the group before adding it, then updates local storage and the currently viewed group.

`removeChannelFromGroup(groupId: number, channelId: number)`

Removes a channel from a group by filtering out the channel ID from the group's channelId array. It then updates local storage and triggers a channel update.

`setViewedGroup(group: Group | null)`

Updates the currently viewed group by setting the value of currentlyViewedGroup.

`approveApplication(userId: number)`

Approves a pending application by removing the user from the pendingUserId array and adding them to the memberId array of the currently viewed group. The updated group is saved to local storage.

`rejectApplication(userId: number)`

Rejects a pending application by removing the user from the pendingUserId array of the currently viewed group. The updated group is saved to local storage.

`getGroups()`

Retrieves all groups from local storage. If no groups are found, it returns an empty array.

`setGroups(groups: Group[])`

Saves the updated list of groups to local storage.

`getGroupByGroupId(id: number)`

Finds and returns a group by its ID from the list of groups stored in local storage.

`getObservableGroupByGroupId(groupId: number)`

Returns an observable that emits the group found by its ID. It retrieves the group from local storage and wraps it in an observable.

`getGroupsByUserId(userId: number)`

Filters and returns the groups where the specified user is a member, by checking if their user ID exists in the memberId array.

`applyToGroup(groupId: number, applyingId: number)`

Allows a user to apply to join a group by adding their ID to the pendingUserId array of the group, provided they are not already a member or pending applicant. The group is then saved to local storage.

`removeApplication(appliedGroupId: number, applyingId: number)`

Removes a user's application from the pendingUserId array of a group. The updated group is saved to local storage.

`leaveGroup(groupId: number, userId: number)`

Removes a user from the memberId array of a group, effectively allowing them to leave the group. The updated group is saved to local storage.

`leaveGroupAdmin(groupId: number, userId: number)`

Removes a user from the adminId array of a group, making them no longer an admin. The updated group is saved to local storage.

`createGroup(groupName: string, creatorId: number)`

Creates a new group with the specified name and creator ID. The creator is added to both the memberId and adminId arrays. The group is saved to local storage if the name is valid (not already taken).

`deleteGroup(groupId: number)`

Deletes a group from the list of groups in local storage by removing it based on its ID.

`findLowestGroupId(groups: Group[])`

Finds the lowest available group ID by incrementing from 1 until a unique ID is found.

`validateGroupName(name: string)`

Checks whether a group name is already taken by comparing it to existing groups. Returns true if the name is unique, otherwise false.

### ChannelService

ChannelService is a service responsible for managing channel data. It provides methods to retrieve, delete, and save channel information, primarily interacting with the localStorage.


`getChannels(): Channel[]`

Retrieves all channels from localStorage.

Returns: An array of Channel objects stored in localStorage. If no channels are found, an empty array is returned.

`getChannelNameById(channelId: number): string`

Finds the name of a channel by its ID.

Parameters: `channelId: number:` The ID of the channel you want to retrieve.

Returns: The name of the channel if found, otherwise an empty string. Also logs an error if the channel is not found.

`findLowestChannelId(channels: Channel[]): number`

Identifies the lowest available channel ID by checking existing channels.

Parameters: `channels: Channel[]:` An array of existing channels.

Returns: The lowest unused ID (starting from 1).

`deleteChannel(channelId: number): void`

Deletes a channel by its ID.

Parameters: `channelId: number:` The ID of the channel to be deleted.

Side Effect: Updates the localStorage with the remaining channels after deletion.

`saveChannels(channels: Channel[]): void`

Saves the provided array of channels to localStorage.

Parameters: `channels: Channel[]:` An array of channels to be stored in localStorage.

### SuperService

SuperService is a service for Super Admins, offering high-level privileges for user management. It relies on the UserService to perform operations on user data.

`promoteUser(userId: number, role: string): void`

Description: Promotes a user by adding the specified role to their list of roles, if it isn't already present. Updates and saves the modified user information.

Parameters:

`userId: number:` The ID of the user to be promoted.

`role: string:` The role to be assigned to the user (e.g., 'GroupAdmin').

Returns:`void`

`demoteUser(userId: number): void`

Description: Demotes a user by removing the 'GroupAdmin' role from their list of roles and updates the user data accordingly.

Parameters:

`userId: number:` The ID of the user to be demoted.

Returns: `void`

`deleteUser(userId: number): void`

Description: Deletes a user from the list based on their ID and updates the user data.

Parameters:

`userId: number:` The ID of the user to be deleted.

Returns: `void`

### UserService

This service manages user data stored in local storage and provides methods to interact with this data.

`getUsers()`

Description: Retrieves an array of all users from local storage. If no users are stored, returns an empty array.

Parameters: None

Returns: `User[]` – An array of users.

`getUserById(userId: number)`

Description: Finds and returns a user by their ID from local storage. Returns `undefined` if the user is not found.

Parameters: 

`userId` – The ID of the user to find.

Returns: `User | undefined` – The user object if found, otherwise undefined.

`setUsers(users: User[])`

Description: Updates the local storage with the latest array of users.

Parameters:
`users` – An array of user objects to store.

Returns: `void`

updateUser(newUser: User)

Description: Adds a new user to the existing list of users and updates local 
storage with this updated list.

Parameters: 

`newUser` – The user object to add to the list.

Returns: `void`

`findLowestUserId()`

Description: Finds and returns the lowest unused user ID by checking existing user IDs.

Parameters: None

Returns: `number` – The lowest available user ID.

`createUser(username: string, email: string, password: string)`

Description: Creates a new user with the specified username, email, and password. Assigns the lowest available user ID and updates the user list.

Parameters:

`username` – The username for the new user.
`email` – The email address for the new user.
`password` – The password for the new user.

Returns: `void` 

getUserNameById(id: number)

Description: Retrieves and returns the username of a user by their ID. Returns 'unknown user' if the user is not found.

Parameters: 

`id` – The ID of the user whose username is to be retrieved.

Returns: `string` – The username of the user if found, otherwise 'unknown user'.


## Components

### AppComponent

The AppComponent in this Angular application serves as the main component for managing authentication, routing, and initial data setup. It handles user login and logout, navigation to different routes, and maintains the current user's role and group information.

Key points:

Authentication: Monitors and updates the authentication state, determining if a user is logged in and whether they have a SuperAdmin role.

Routing: Manages navigation and updates the current route and group information based on the URL.

Data Initialization: Ensures that essential local storage values for users, groups, channels, and group admins are set up and creates a default SuperAdmin if none exists.

Subscriptions: Subscribes to router events to manage the current route and group context, and listens for changes in user roles to update the component's state accordingly.

### Sign-Up

The SignUpComponent handles user registration by collecting and validating user input for username, email, and password. It ensures that all required fields are filled, performs basic email validation, and checks for existing usernames and emails before creating a new user account.

Key points:

User Input Handling: Collects and validates user input for sign-up, including checking for required fields and valid email format.

Validation Checks: Ensures that the username and email are unique by comparing with existing users, displaying appropriate error messages if duplicates are found.

User Creation and Authentication: Creates a new user if all checks pass and logs in the user, redirecting them to the dashboard upon successful registration.

Error Messaging: Provides feedback to the user in case of missing fields, invalid email, or existing username/email.


### Login

The LoginComponent manages user authentication by capturing and validating user login credentials. It attempts to authenticate the user and, upon successful login, redirects them to the dashboard. If authentication fails, it displays an error message.

Key points:

Login Handling: Collects user input for username and password and processes login attempts.

Authentication Check: Uses AuthService to verify login credentials, redirecting the user to the dashboard upon success.

Error Handling: Displays an error message if login fails, prompting the user to try again.

### Dashboard

The DashboardComponent is responsible for displaying user-specific information on the dashboard, including the user's profile and the groups they are associated with. It fetches and displays the user’s profile and their groups upon initialization. It also provides functionality to edit or delete the user profile.

Key points:

User Profile and Groups: Retrieves and displays the user's profile and associated groups using AuthService and GroupService.

Initialization: On component initialization, fetches the user profile and groups related to the user.

Profile Management: Includes methods for editing and deleting the user profile (logic for these methods is not implemented).

### Groups

The GroupsComponent manages and displays a list of groups that users can interact with. It provides functionality to view, create, and manage groups based on the user's role. The component supports actions such as applying to, canceling from, leaving, and deleting groups, as well as checking membership status and handling group creation.

Key points:

Group Management: Displays groups, allows users to apply, cancel applications, leave groups, and delete groups.

Role-Based Access: Determines group management capabilities based on the user’s role and group membership status.

Group Creation: Provides functionality to create new groups, ensuring no duplicate names are allowed.

Initialization: On initialization, retrieves and displays the list of groups and user roles, and updates the component state accordingly.

### GroupView

The GroupViewComponent provides detailed management and interaction functionalities for a specific group. It allows users to view group details, manage channels, and handle pending applications. The component supports adding new channels, joining channels, and removing existing ones based on the user's role and permissions.

Key points:

Group Management: Displays details of the currently viewed group, including its members and channels.

Channel Management: Facilitates adding new channels, joining existing ones, and removing channels from the group.

Pending Applications: Toggles visibility for pending applications related to the group.

Role-Based Access: Restricts certain actions to users with appropriate roles, such as SuperAdmins or Group Admins.

Subscription Management: Handles subscriptions to observables for real-time updates on group and channel changes, and cleans up subscriptions on component destruction.

### Pending-Applications

The PendingApplicationsComponent handles the display and management of pending group applications. It shows a list of users who have applied to join the group and provides options to approve or reject these applications. It is inserted into the GroupView to assist in management of that group.

Key points:

Display Pending Applications: Retrieves and displays pending user applications based on the currently viewed group.

Approval and Rejection: Provides methods to approve or reject user applications for group membership.

Visibility Control: Manages the visibility of the pending applications section.

User Lookup: Uses a user service to fetch and display user names for the pending applications.

### Manage-Members

The ManageMembersComponent provides functionalities for managing user roles and deleting users. It allows for promoting users to higher roles, demoting users, and removing users from the system. The component includes a dropdown menu for selecting and performing actions on users.

Key points:

User Management: Supports promoting users to roles such as GroupAdmin or SuperAdmin, and demoting them back to regular users.

User Deletion: Enables deletion of users from the system.

Dropdown Menu: Utilizes a dropdown menu to select a user and perform actions based on the selection.

Data Refresh: Refreshes the user list and state after each action to reflect changes immediately.

### Channel

The ChannelComponent serves as the view to handle users interacting with each other on the application. It will serve as the main area to conduct text, voice and video chat with other users.

### Manage-Reports

ManageReports component is the view that handles reports issued against certain users by GroupAdmins that a SuperAdmin needs to acknowledge. It provides a list of all the issued reports and requires SuperAdmins to mark them as acknowledged.


## Node Server

This Node.js server, set up with the Express framework, serves an Angular application. It uses the cors middleware to handle Cross-Origin Resource Sharing (CORS), allowing requests from different origins. The server serves static files from the Angular build directory located in `../frontend/dist/frontend/browser.` It includes a catch-all route that redirects all requests to the Angular application's entry point (index.html).

## Client-Server Interactions

In phase 1 there are minimal client-server interactions outside of the server hosting the frontend.

To simulate the server the browser LocalStorage was used as a database. JSON stringify and parasing were used to store and extract saved data such as data structures with user, group and channel information. As users interact with the frontend service methods were called that accessed the localstorage to authenticate users and populate the page elements.


