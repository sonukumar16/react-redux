import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { toast } from "react-toastify";

import { loadCourses, saveCourse, updateCourse } from "redux/actions/course";
import { loadAuthors } from "redux/actions/author";
import { newCourse } from "../../../tools/mockData";
import CourseForm from "./CourseForm";
import Spinner from "../common/spinner";

export const ManageCoursePage = props => {
  const {
    courses,
    authors,
    loadAuthors,
    loadCourses,
    saveCourse,
    updateCourse,
    history
  } = props;

  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEmpty(courses))
      loadCourses().catch(error =>
        console.log("getting error to load the courses.", error)
      );
    else {
      setCourse({ ...props.course });
    }
    if (isEmpty(authors))
      loadAuthors().catch(error =>
        console.log("getting error to load the authors.", error)
      );
  }, [props.course]);

  const handleChange = event => {
    const { name, value } = get(event, "target");
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  };

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };
  const handleSave = event => {
    event.preventDefault();
    if (!formIsValid()) return;
    const ApiCall = course.id ? updateCourse : saveCourse;
    setSaving(true);
    ApiCall(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };
  return isEmpty(courses && authors) ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageCoursePage.prototype = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

const mapStateToProps = (state, ownProps) => {
  const slug = get(ownProps, ["match", "params", "slug"], "");
  const { courses, authors } = state;
  return {
    course:
      slug && !isEmpty(courses) ? getCourseBySlug(courses, slug) : newCourse,
    courses: courses,
    authors: authors
  };
};

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
  updateCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
