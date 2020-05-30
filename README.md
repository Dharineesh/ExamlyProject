DEPLOYMENT LINK : https://examly-project.herokuapp.com/

REQUIREMENT : json viewer extension
RECOMMENDED DEVICE : Desktop,Laptop

LOGIN : Login requires Email and Password. If new to classroom platform create a new account using Signup.
	Error will be thrown if the provided email or password is invalid during login.

SIGNUP : Signup page consist of Firstname , Lastname , Email and Password.
	Error will be thrown if the email already exists or if a field is empty.

=> Login will redirect to UpdateProfile, which has personal and acdemic details.
	If You have a updated profile, on clicking the update button an error will be thrown.
=> Show Profile will respond a apge with personal and academic details.
=> Home will redirect to home page.

=> Home Page consist of basic header with navigation for home, about, courses, profile, notification and logout.
   Body of home page consist of various courses of various web sources.

NOTIFICATION : Notification will be triggered when the following happens:
			1) A new course is available for subset of students
			2) A class wide notification is triggered by staff (email : generalToAll)
			3) When a student completes a course
=> Update Course Details has list of courses which has to be selected by the user.
   This will reflect in the notification of all users.

DEPENDENCIES OR MODULES USED : * express
			       * mongoose
			       * nodemon
			       * dotenv
			       * body-parser
			       * path

To start the server use "npm  start" in the command prompt of the working directory.
"start" script will trigger the command "nodemon index.js" (npm should be installed and initialised in the working directory).

index.js - It is a javascript file which is used to create a server using express, and redirect control to the controller.

MODEL : The schemas used to store data in database is defined.
	These schemas include for the action of signup, updateProfile, NotificationData and CompletedCourse.

DATABASE USED : mongodb cloud
		Advantages : 
			Schema Less
			Scalable
			Document Oriented Storage
			Easy to connect and maintain data
