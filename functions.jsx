import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Collapse, Modal, ListGroup, Toast } from 'react-bootstrap';

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
                        <ul className="list-group mt-2" >
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

const Toaster = ({ txt, bg }) =>{
    const [show, setShow] = useState(false);

    setShow(true);
    setTimeout(() => {
        setShow(false);
    }, 3000);
    

    return (
        <div>
        <Toast show={show} onClose={() => setShow(false)}>
            <Toast.Body className={bg}>{txt}</Toast.Body>
        </Toast>
        </div>
    );
  }

const ForLi = ({freeHotel, fn, actives}) => {

    const notChoozing = () => <Toaster txt={'Выберите плательщика'} bg={'bg-danger'} />
    
        const choozing = () => {
            <Toaster txt={'Успешно'} bg={'bg-success'} />
            fn(hotelName, number.hotelNumber)
        }
    
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
                                    <button onClick={actives === '' ? notChoozing : choozing} className="mr-3 btn btn-outline-success">Бронь</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Collapse>
            </li>
        </div>
    );
}

const ModalForPayer = ({ name, phone, type, fn }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleShow = () => setOpen(true);
    const confirm = () => {
        handleClose();
        fn();
    };
    return (
        <>
            <Button variant="btn btn-outline-success" onClick={handleShow}>
                Начать бронь
            </Button>

          <Modal show={open} onHide={handleClose}>
            <Modal.Header className='bg-light' closeButton>
              <Modal.Title>Проверка</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <ListGroup.Item>Name: {name}</ListGroup.Item>
                    <ListGroup.Item>Phone: {phone}</ListGroup.Item>
                    <ListGroup.Item>Type: {type}</ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer className='bg-light justify-content-around'>
              <Button variant="outline-danger" onClick={handleClose}>
                Отмена
              </Button>
              <Button variant="outline-success" onClick={confirm}>
                Подтвердить
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

const ViewPayers = ({ payer, fn }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    confirm = () => {
        fn(payer)
        handleClose();
    }

    return (
        <div className="col-1">
            <Button className='btn-payer' variant="primary" onClick={handleShow}>
                {payer.payerName}
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Выбор плательщика</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Name: {payer.payerName}</p>
                    <p>Phone: {payer.payerPhoneNum}</p>
                    <p>Type: {payer.payerType}</p>
                </Modal.Body>
                <Modal.Footer className='bg-light justify-content-around'>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="success" onClick={confirm}>
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export { HotelsCards, ForLi, ModalForPayer, ViewPayers, Toaster };