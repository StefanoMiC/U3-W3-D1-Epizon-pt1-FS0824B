import { Col, Row, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const BookDetail = () =>
  // { bookSelected }
  {
    // stiamo recuperando la funzione che avvia il processo di cambio di stato globale (Store)
    const dispatch = useDispatch();
    // quindi ora dentro la variabile dispatch abbiamo la funzione che potremo utilizzare dal click del nostro bottone di aggiunta al carrello
    const bookSelected = useSelector(state => state.bookSelected.content);
    const user = useSelector(state => state.user.content);
    return (
      <div className="mt-3 mb-4 mb-lg-0">
        {bookSelected ? (
          <>
            <Row>
              <Col sm={12}>
                <h1>{bookSelected.title}</h1>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <div className="mt-3">
                  <img className="book-cover" src={bookSelected.imageUrl} alt="book selected" />
                </div>
              </Col>
              <Col sm={8}>
                <p>
                  <span className="font-weight-bold">Description:</span>&nbsp;
                  {bookSelected.description}
                </p>
                <p>
                  <span className="font-weight-bold">Price:</span>&nbsp;
                  {bookSelected.price}€
                </p>
                {user ? (
                  <Button
                    color="primary"
                    onClick={() => {
                      // dispatch viene ricavata tramite hook (vedi sopra)
                      // mentre il suo argomento è un oggetto chiamato ACTION
                      // che deve SEMPRE avere un type, e opzionalmente un payload con il dato da inviare al reducer
                      // che verrà poi elaborato internamente per inserirsi nello Store
                      dispatch({ type: "ADD_TO_CART", payload: bookSelected });
                    }}
                  >
                    ADD TO CART
                  </Button>
                ) : (
                  <Alert variant="warning">Devi loggarti per poter inserire prodotti nel carrello</Alert>
                )}
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col sm={12}>
              <h3>Start by clicking on a book!</h3>
            </Col>
          </Row>
        )}
      </div>
    );
  };

export default BookDetail;
