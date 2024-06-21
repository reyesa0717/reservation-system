import React from "react";
import { useHistory } from "react-router-dom";
import { hasValidDateAndTime } from "./ReservationValidate";

export const ReservationForm = ({
  initialReservation,
  changeHandler,
  submitHandler,
}) => {
  const history = useHistory();
  const [reservation, setReservation] = useState(initialReservation);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = hasValidDateAndTime(reservation);

    if (validationErrors.length > 0){
      setErrors(validationErrors);
      return;
    }

    submitHandler(reservation);
  }

  const handleChange = (event) => {
    const { name , value } = event.target;
    setReservation({
      ...reservation,
      [name]: value,
    });
  };

  return (
    <div>
      {errors.length > 0 &&(
        <div className="alert alert-danger">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              required={true}
              value={reservation.first_name}
              maxLength="100"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              required={true}
              value={reservation.last_name}
              maxLength="100"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              id="mobile_number"
              name="mobile_number"
              type="text"
              required={true}
              value={reservation.mobile_number}
              maxLength="100"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="reservation_date">Reservation Date:</label>
            <input
              id="reservation_date"
              name="reservation_date"
              type="date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              required={true}
              value={reservation.reservation_date}
              maxLength="100"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="reservation_time">Reservation Time:</label>
            <input
              id="reservation_time"
              name="reservation_time"
              type="time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              required={true}
              value={reservation.reservation_time}
              maxLength="100"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="people">Number of People:</label>
            <input
              id="people"
              name="people"
              type="number"
              required={true}
              value={reservation.people}
              min={1}
              onChange={handleChange}
            />
          </div>
          <div className="group-row">
            <button
              className="red"
              type="button"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
            <button className="black" type="submit">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ReservationForm;