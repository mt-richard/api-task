
/**
 * @swagger
 * tags:
 *  description: Here we're having some routes
 *  name: NodeJs Api Doc
 */
 
/**
 *@swagger
 * /users/login:
 *   post:
 *     summary: Login Authentication
 *     tags:  [UsersController]
 *     description: Login using Email and password
 *     parameters:
 *       - name: user
 *         in: body
 *         description: The user object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *               format: password
 *     responses:
 *       201:
 *         description: User Logged successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 * 
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:  [UsersController]
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal server error
 * 
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     tags:  [UsersController]
 *     description: Create a new user with the provided data
 *     parameters:
 *       - name: user
 *         in: body
 *         description: The user object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *               format: password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 * 
 * /users/delete/{userId}:
 *   delete:
 *     summary: Delete user by ID
 *     tags:  [UsersController]
 *     description: delete a user using his/her ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Numerical ID required
 *         required: true
 *         schema:
 *           type: integer
 * 
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 * 
 * 
 * 
 * /users/update/{userId}:
 *   patch:
 *     summary: Update User by ID
 *     tags:  [UsersController]
 *     description: Modifying user info based in ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Numerical ID required   
 *         required: true
 *         schema:
 *          type: integer    
 *       - name: user
 *         in: body
 *         description: The user object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name: 
 *               type: string   
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *               format: password
 *     responses:
 *       201:
 *         description: User Updated successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 * 
 */




 /**
  * @swagger
  * /applicant:
 *   get:
 *     summary: Get all applicants
 *     tags:  [Application]
 *     description: Retrieve a list of all applicants users
 *     responses:
 *       200:
 *         description: A list of applicants
 *       500:
 *         description: Internal server error
 * 
 * /applicant/{userId}:
 *   get:
 *     summary: Get one applicant with ID
 *     tags:  [Application]
 *     description: Retrieve a list of all applicants users
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Numerical ID required
 *         required: true
 *         schema:
 *           type: integer
 *           
 *     responses:
 *       200:
 *         description: A list of applicants
 *       500:
 *         description: Internal server error
 * 
 * 
 * /applicant/add/:
 *   post:
 *     summary: Add applicant by ID
 *     tags:  
 *       - Application
 *     description: Add applicant details
 *     parameters:
 *      
 *       - name: userupdate
 *         in: body
 *         description: Add applicant details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             phone:
 *               type: string
 *             position:
 *               type: string
 *             link:
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful Added
 *       '404':
 *         description: Applicant not found
 * 
 * 
 * 
 * 
 * /applicant/edit/{userId}:
 *   put:
 *     summary: Update applicant by ID
 *     tags:  
 *       - Application
 *     description: Update applicant details
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Numerical ID of the applicant
 *         required: true
 *         schema:
 *           type: integer
 *       - name: userupdate
 *         in: body
 *         description: Updated applicant details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             phone:
 *               type: string
 *             position:
 *               type: string
 *             link:
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful update
 *       '404':
 *         description: Applicant not found
 * 
 * 
 * /applicant/delete/{userId}:
 *   delete:
 *     summary: Delete applicant by ID
 *     tags:  
 *       - Application
 *     description: Delete applicant details
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: Numerical ID of the applicant
 *         required: true
 *         schema:
 *           type: integer
 * 
 *     responses:
 *       '200':
 *         description: Successful update
 *       '404':
 *         description: Applicant not found
 */
