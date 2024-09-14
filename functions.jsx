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
                        <div className="numbers-list">
                            <ul className="list-group mt-2" >
                                {numbers.map((number) => (
                                    <li key={number.numberId} className='list-group-item mb-2'>Номер {number.hotelNumber} - {number.status}</li>
                                ))}
                            </ul>
                        </div>
                    )}
          </Card.Text>
          <Button variant="primary" onClick={toggleShowNumbers} >{showNumbers ? 'Скрыть номера' : 'Показать номера'}</Button>
        </Card.Body>
      </Card>
    );
}


function showMessage(txt, state='bad') {
    const divShow = document.querySelector('.show-info');
    divShow.textContent = txt;
    divShow.style.opacity = '1';
    state === 'good' ? divShow.classList.add('bg-success', 'bg-gradient') : divShow.classList.add('bg-danger', 'bg-gradient');

    setTimeout(() => {
        divShow.style.opacity = '0';
        state === 'good' ? divShow.classList.remove('bg-success', 'bg-gradient') : divShow.classList.remove('bg-danger', 'bg-gradient');
    }, 2000);
}

const ForLi = ({freeHotel, fnChng, fnAddNum, actives}) => {
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
                    <div id="collapse">
                        <ul className='list-group mt-2'>
                            {freeHotel.hotelNumbers.map((number) => (
                                <li key={number.numberId} className='list-group-item mb-2 d-flex justify-content-between align-items-center'>
                                    Номер {number.hotelNumber}
                                    {actives === '' ? (<button onClick={() => showMessage('Выберите плтельщика')} className="mr-3 btn btn-outline-success">Бронь</button>) : (<button onClick={() => {
                                        fnChng(hotelName, number.hotelNumber)
                                        fnAddNum(actives, number);
                                        showMessage('Бронирование успешно!', 'good');
                                    }} className="mr-3 btn btn-outline-success">Бронь</button>)}
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

export { HotelsCards, ForLi, ModalForPayer, ViewPayers };