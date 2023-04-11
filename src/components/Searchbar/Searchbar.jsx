import { Formik, Form, Field } from 'formik';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    await onSubmit(values);
    setSubmitting(false);
  };

  return (
    <header className="Searchbar">
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="SearchForm" autoComplete="off">
            <button
              type="submit"
              className="SearchForm-button"
              disabled={isSubmitting}
            >
              <span className="SearchForm-button-label">
                <AiOutlineSearch />
              </span>
            </button>
            <Field
              name="search"
              className="SearchForm-input"
              type="text"
              placeholder="Search images and photos"
            />
          </Form>
        )}
      </Formik>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
