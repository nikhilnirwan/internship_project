import * as moment from "moment";

export const timeSheetConfig = {
  //  listApi:(date = moment().format("M")) =>  {
  //   if (Array.isArray(date)) {
  //     const startDate = moment(date[0]).format("M");
  //     const endDate = moment(date[1]).format("M");
  //     return `/timesheet/get/userlist/?date=${startDate}&endDate=${endDate}`;
  //   } else {
  //     return `/timesheet/get/userlist/?date=${date}`;
  //   }
  // }   ,
  listApi: () => "/timesheet/timeSheets",
  formUrl: () => "/timesheet/timeSheets",
  updateAPI: () => "/timesheet/timeSheets/",
  deleteApi: () => "/timesheet/timeSheets/",
  title: "Timesheet",
  isActionTab: true,
  maskClosable: false,
  modalTitle: (action) => action + " Timesheet",
  getColumns: () => {
    return [
      {
        title: "Date",
        dataIndex: "workingDate",
        key: "workingDate",
        isSearch: true,
      },

      {
        title: "Project Name",
        dataIndex: "projectName",
        key: "projectName",
        isSearch: true,
      },

      {
        title: "Day Type",
        dataIndex: "daytype",
        key: "daytype",
        isSearch: true,
      },
    ];
  },
  getFormColumns: () => {
    return [
      {
        title: "Date",
        dataIndex: "workingDate",
        key: "workingDate",
        type: "date",
        isRequired: true,
        formClassName: "col-4 pb-2",
      },

      {
        title: "Project Name",
        dataIndex: "projectName",
        key: "projectName",
        type: "select",
        formClassName: "col-4 pb-2",
        listApi: "/project/projects",
      },
      {
        title: "Task Category",
        dataIndex: "taskCategory",
        key: "taskCategory",
        type: "select",
        note: "Please select a right category",
        formClassName: "col-4 pb-2",
        listApi: "/task",
      },
      {
        title: "Issue Tracker Link",
        dataIndex: "issuetrackerlink",
        key: "issuetrackerlink",
        type: "url",
        formClassName: "col-4 pb-2",
      },
      {
        title: "Value Deliverd",
        dataIndex: "valuedeliverd",
        key: "valuedeliverd",
        type: "text",
        isRequired: true,
        note: "Result/Benefit of the activity and achievement",
        formClassName: "col-4 pb-2",
      },
      {
        title: "Time Spent",
        dataIndex: "timespent",
        key: "timespent",
        type: "time",
        isRequired: true,
        formClassName: "col-4 pb-2",
      },
      {
        title: "Lession Learn",
        dataIndex: "newLearn",
        key: "newLearn",
        type: "text",
        formClassName: "col-4 pb-2",
      },
      {
        title: "Day Type",
        dataIndex: "daytype",
        key: "daytype",
        type: "select",
        children: [
          { name: "Work From Home", value: "Work From Home" },
          { name: "Leave Full Day", value: "Leave Full Day" },
          { name: "Leave Half Day", value: "Leave Half Day" },
        ],
        formClassName: "col-4 pb-2",
      },
      {
        title: "Count Of Bugs-(A) category",
        dataIndex: "bugsa",
        key: "bugsa",
        type: "text",
        note: "Highest severity ,application fatal error type",
        formClassName: "col-4 pb-2",
      },
      {
        title: "Count Of Bugs-(B) category",
        dataIndex: "bugsb",
        key: "bugsb",
        type: "text",
        note: "Major ,application significant fatal error type",
        formClassName: "col-4 pb-2",
      },
      {
        title: "Count Of Bugs-(C) category",
        dataIndex: "bugsc",
        key: "bugsc",
        type: "text",
        note: "Medium in importance",
        formClassName: "col-4 pb-2",
      },
      {
        title: "Count Of Bugs-(D) category",
        dataIndex: "bugsd",
        key: "bugsd",
        type: "text",
        note: "Minor ,Typically cosmatic in nature",
        formClassName: "col-4 pb-2",
      },

      {
        title: "Total Hours",
        dataIndex: "hours",
        type: "number",
        key: "hours",
        formClassName: "col-4 pb-2",
      },
      {
        title: "Remarks",
        dataIndex: "Remarks",
        key: "Remarks",
        type: "text",
        formClassName: "col-4 pb-2",
      },
    ];
  },
  getData: () => {},
  actions: [
    { name: "From", isFilter: true, date: true, settings: { type: "primary" } },
    // { name: "From", isFilter: true, isDropDown: true, mode: 'multiple', settings: { type: "primary" } },
    { name: "Add TimeSheet", isModal: true, settings: { type: "primary" } },
    { name: "Return", isBack: true, settings: { type: "primary" } },
  ],
};
