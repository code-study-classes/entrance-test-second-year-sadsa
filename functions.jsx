import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Collapse, Modal, ListGroup } from 'react-bootstrap';

const HotelsCards = ({hotelName, region, numbers}) => {
    const [showNumbers, setShowNumbers] = useState(false);

    const toggleShowNumbers = () => {
        setShowNumbers(!showNumbers);
    };

    return (
      <Card className='hotel-card' style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{hotelName}</Card.Title>
          <Card.Text>
            Регион: {region}
            <br />
            {showNumbers && (
                        <ul className="list-group mt-2">
                            {numbers.map((number) => (
                                <li key={number.numberId} className='list-group-item mb-2'>Номер {number.hotelNumber} - {number.status}</li>
                            ))}
                        </ul>
                    )}
          </Card.Text>
          <Button variant="primary" onClick={toggleShowNumbers} >{showNumbers ? 'Скрыть номера' : 'Показать номера'}</Button>
        </Card.Body>
      </Card>
    );
}

const ForLi = ({freeHotel, fn}) => {
    const { hotelName } = freeHotel;
    const [open, setOpen] = useState(false);
    return (
        <div className='col bg-success bg-gradient text-white list-group d-flex justify-content-between'>
            <li className='list-group-item'>{freeHotel.hotelName}</li>
            <li className='list-group-item'>Регион: {freeHotel.region}</li>
            <li className='list-group-item'>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    className="btn btn-outline-light"
                >
                    {open ? 'Скрыть номера' : 'Показать номера'}
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <ul className='list-group mt-2'>
                            {freeHotel.hotelNumbers.map((number) => (
                                <li key={number.numberId} className='list-group-item mb-2 d-flex justify-content-between align-items-center'>
                                    Номер {number.hotelNumber}
                                    <button onClick={() => fn(hotelName, number.hotelNumber)} className="mr-3 btn btn-outline-success">Бронь</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Collapse>
            </li>
        </div>
    );
}

const ModalForPayer = ({ name, phone, type }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleShow = () => setOpen(true);
    return (
        <>
            <Button variant="btn btn-outline-success" onClick={handleShow}>
                Начать бронь
            </Button>

          <Modal className='bg-gray' show={open} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Проверка</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <ListGroup.Item>{name}</ListGroup.Item>
                    <ListGroup.Item>{phone}</ListGroup.Item>
                    <ListGroup.Item>{type}</ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Отмена
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Подтвердить
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export { HotelsCards, ForLi, ModalForPayer };