const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');

const db = require('../../db/db.js');
const { BadRequestError, NotFoundError } = require('../../utils/api-errors');
const { create } = require('../../middlewares');
const logger = require('../../support/logger');

const CreateService = {
  /**
   * Login a user and generate token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} When the user is not found.
   */

  doCreate: async (requestBody) => {
    try {
      // Destructure the task details from the request body
      const {
        tasktitle,
        taskdescription,
        taskstartdatetime,
        taskenddatetime,
        tasktypetitle,
        prioritytype,
        statustitle,
        userId
      } = requestBody;

      let checkUsernameQuery = `SELECT * FROM userdetails WHERE uid = '${userId}';`;
      const checkUsernameResult = await db.promise(checkUsernameQuery);

      // If the username exists, insert the task data into the tasklist table
      if (checkUsernameResult.length > 0) {
        // const loacalUsername = sessionStorage.getItem(data.data.username);
        let insertQuery = `INSERT INTO tasklist (tasktitle, taskdescription, taskstartdatetime, taskenddatetime, tasktypeid, priorityid, statusid, uid)
          SELECT '${tasktitle}', '${taskdescription}', '${taskstartdatetime}', '${taskenddatetime}', tasktypeid, priorityid, statusid, uid
          FROM tasktype, priority, statusdetails, userdetails
          WHERE tasktype.tasktypetitle = '${tasktypetitle}'
          AND priority.prioritytype = '${prioritytype}'
          AND statusdetails.statustitle = '${statustitle}'
          AND userdetails.uid = '${userId}';`;
        console.log(insertQuery);

        await db.promise(insertQuery);
      }

      // Select all tasks from the tasklist table
      let selectQuery = `SELECT * FROM tasklist;`;
      const selectResult = await db.promise(selectQuery);
      console.log('selectResult', selectResult);

      return selectResult;
    } catch (error) {
      // Throw an InternalServerError if something goes wrong
      // throw new Error('An error occured while creating the task');
      logger.error(error);
    }
  },

  doView: async (requestBody) => {
    console.log('requestBody', requestBody);
    let id = requestBody.userId;
    try {
      // SQL query to select all tasks from the tasklist table of a particular user
      let queryObj = `SELECT tasklist.taskid, tasklist.tasktitle, tasklist.taskdescription, tasklist.taskstartdatetime, tasklist.taskenddatetime, tasktype.tasktypetitle, priority.prioritytype, statusdetails.statustitle 
        FROM tasklist 
        INNER JOIN tasktype ON tasklist.tasktypeid = tasktype.tasktypeid 
        INNER JOIN priority ON tasklist.priorityid = priority.priorityid 
        INNER JOIN statusdetails ON tasklist.statusid = statusdetails.statusid 
        WHERE tasklist.uid = ${id};`;
      // let queryObj = `SELECT * FROM task;`;
      // Execute the query and store the result in "taskList"
      const resultObj = await db.promise(queryObj);
      console.log('resultObj', JSON.stringify(resultObj));
      // Return the task list to the caller
      return resultObj;
    } catch (error) {
      // Log any errors that occur
      logger.error(error);
    }
  },

  doViewbyName: async (requestObj) => {
    console.log('requestBody', requestObj.params.tasktitle);

    let tasktitle = requestObj.params.tasktitle || '';
    console.log('tasktitle', tasktitle);
    try {
      // SQL query to select all tasks from the tasklist table of a particular user
      let queryObj = `SELECT tasklist.taskid, tasklist.tasktitle, tasklist.taskdescription, tasklist.taskstartdatetime, tasklist.taskenddatetime, tasktype.tasktypetitle, priority.prioritytype, statusdetails.statustitle 
        FROM tasklist 
        INNER JOIN tasktype ON tasklist.tasktypeid = tasktype.tasktypeid 
        INNER JOIN priority ON tasklist.priorityid = priority.priorityid 
        INNER JOIN statusdetails ON tasklist.statusid = statusdetails.statusid 
        WHERE tasklist.tasktitle LIKE '%${tasktitle}%';`;
      // Execute the query and store the result in "taskList"
      const resultObj = await db.promise(queryObj);
      console.log('resultObj', JSON.stringify(resultObj));
      // Return the task list to the caller
      return resultObj;
    } catch (error) {
      // Log any errors that occur
      logger.error(error);
    }
  },



  doDelete: async (requestObj) => {
    console.log('requestBody', requestObj.params.taskid);

    let taskId = requestObj.params.taskid || '';
    console.log('taskId', taskId);
    try {
      // SQL query to select all tasks from the tasklist table of a particular user
      let queryObj = `DELETE FROM tasklist WHERE taskid = ${taskId}`;
      // Execute the query and store the result in "taskList"
      const resultObj = await db.promise(queryObj);
      console.log('resultObj', JSON.stringify(resultObj));
      // Return the task list to the caller
      return resultObj;
    } catch (error) {
      // Log any errors that occur
      logger.error(error);
    }
  }











};

module.exports = CreateService;
