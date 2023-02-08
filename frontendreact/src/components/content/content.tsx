
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import './content.css';
import { AppState } from '../../redux/store';
import React, { useState, useEffect } from 'react';
import getTaskList from './contentservice';



interface Task {
    taskid: number;
    tasktitle: string;
    taskdescription: string;
    taskstartdatetime: string;
    taskenddatetime: string;
    tasktypetitle: string;
    prioritytype: string;
    statustitle: string;
  }



const Content = () => {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchTaskList = async () => {
            try {
                const response = await getTaskList();
                setTaskList(response.data);
                // eslint-disable-next-line no-console
                console.log('taskList',taskList);
                navigate('/home');
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
        };
        fetchTaskList();
    }, []);


    return (
        <>
            <Table striped hover className="tablecolor">
                <th className="headingcol">
                    <td>Task ID</td>
                </th>
                <th className="headingcol">
                    <td>TaskTitle</td>
                </th>
                <th className="headingcol">
                    <td>TaskDescription</td>
                </th>
                <th className="headingcol">
                    <td>StartDateTime</td>
                </th>
                <th className="headingcol">
                    <td>EndDateTime</td>
                </th>
                <th className="headingcol">
                    <td>TaskType</td>
                </th>
                <th className="headingcol">
                    <td>TaskPriority</td>
                </th>
                <th className="headingcol">
                    <td>TaskStatus</td>
                </th>
                <th>
                    <td className="headingcol">Action</td>
                </th>
                {taskList.map(task => (
                <tr key={task.taskid}>
                    <td>{task.taskid}</td>
                    <td>{task.tasktitle}</td>
                    <td>{task.taskdescription}</td>
                    <td>{task.taskstartdatetime}</td>
                    <td>{task.taskenddatetime}</td>
                    <td>{task.tasktypetitle}</td>
                    <td>{task.prioritytype}</td>
                    <td>{task.statustitle}</td>
                    <td>
                    <Button className ='mr-2' id="delete-button" variant="danger">
                        <RiDeleteBin5Line/></Button><span> &nbsp;&nbsp;</span>
                    </td>
                    <td>
                    <Button className ='mr-2' id="edit-button" variant="info" ><FaEdit/></Button>
                    </td>
                    <td>
                    </td>
                </tr>
                ))};
            </Table>
        </>
    );
};
export default Content;