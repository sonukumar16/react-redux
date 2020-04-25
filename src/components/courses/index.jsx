import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { toast } from "react-toastify";

import { loadCourses, deleteCourse } from "redux/actions/course";
import { loadAuthors } from "redux/actions/author";
import { courseAuthorSelector } from "redux/reducers/courseReducer";
import CourseList from "./CourseList";
import Spinner from "../common/spinner";

class Course extends Component {
  state = {
    redirectToAddCoursePage: false
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (isEmpty(courses))
      actions
        .loadCourses()
        .catch(error =>
          console.log("getting error to load the courses.", error)
        );
    if (isEmpty(authors))
      actions
        .loadAuthors()
        .catch(error =>
          console.log("getting error to load the authors.", error)
        );
  }

  handleDeleteCourse = async course => {
    toast.success('Course delete');
    try {
      this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    const { courses } = this.props;
    console.log("render of compenet")
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2> Courses </h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              courses={courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

Course.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    courses: courseAuthorSelector(state),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
};
const mapDispatchToProps = dispatch => ({
  actions: {
    loadCourses: bindActionCreators(loadCourses, dispatch),
    loadAuthors: bindActionCreators(loadAuthors, dispatch),
    deleteCourse: bindActionCreators(deleteCourse, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course);
