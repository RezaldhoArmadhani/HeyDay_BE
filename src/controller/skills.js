const {
  selectAllSkills,
  selectSkills,
  countData,
  showSkillByUserId,
  insertSkills,
  findId,
  findName,
  deleteSkills,
  updateSkills,
} = require("../model/skills");

const commonHelper = require("../helper/common");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const authHelper = require("../helper/AuthHelper");
const jwt = require("jsonwebtoken");

const skillsController = {
  getAllSkills: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      let sortBY = req.query.sortBY || "id_worker";
      let sort = req.query.sort || "ASC";
      let searchParam = req.query.search || "";
      const result = await selectAllSkills(
        limit,
        offset,
        searchParam,
        sortBY,
        sort
      );

      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };

      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },

  getSkillUser: async (req, res) => {
    try {
      //Get request user id
      const id_worker = req.params.id;

      //Check if user already liked recipe
      const result = await showSkillByUserId(id_worker);
      if (!result.rowCount)
        return commonHelper.response(
          res,
          null,
          202,
          "User haven't liked any recipe"
        );

      //Response
      commonHelper.response(
        res,
        result.rows,
        200,
        "Get user liked recipes successful"
      );
    } catch (error) {
      console.log(error);
      commonHelper.response(
        res,
        null,
        500,
        "Failed getting user liked recipes"
      );
    }
  },

  getDetailSkills: async (req, res) => {
    const id = req.params.id;
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return res.json({ message: "ID is Not Found" });
    }
    selectSkills(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },

  updateSkills: async (req, res) => {
    const id = req.params.id;
    const id_worker = req.payload.id;
    const { name } = req.body;

    const { rowCount } = await findId(id);
    if (!rowCount) return res.json({ message: "skill not exist!" });

    const data = {
      id,
      name,
      id_worker,
    };
    updateSkills(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "Data Worker Updated!");
      })
      .catch((error) => {
        res.send(error);
      });
  },

  deleteSkills: async (req, res) => {
    try {
      const id = req.params.id;
      const id_worker = req.payload.id;
      const { rowCount } = await findId(id);

      if (!rowCount) {
        return res.json({ message: "Skills not Found" });
      }
      deleteSkills(id, id_worker)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Skill deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  inputSkills: async (req, res) => {
    const id_worker = req.params.id;
    const id = uuidv4();

    const { name } = req.body;
    const { rowCount } = await findName(name);
    console.log(rowCount);

    if (rowCount) return res.json({ message: "Skill already exist!" });

    console.log(id_worker);

    const data = {
      id,
      name,
      id_worker,
    };
    insertSkills(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "Data Skill Created");
      })
      .catch((error) => {
        res.send(error);
      });
    // console.log(name);
  },
};

module.exports = skillsController;
