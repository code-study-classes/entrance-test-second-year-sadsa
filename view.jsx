import React from 'react';
import ReactDOM from 'react-dom/client';
import hotels from './baseHotels';
import { HotelsCards, ForLi } from './functions';

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels,
            inputIdHotel: '',
            inpitIdNumber: '',
            freeList: false,
        };
    }

    freeNumbersSearching = () => {
        const { hotels } = this.state;
        const free = hotels.map((item) => {
            return { 
                hotelId: item.hotelId,
                hotelName: item.hotelName,
                region: item.region,
                hotelNumbers: item.hotelNumbers.filter((num) => num.status === 'free')
            }
        });       
        return free;
    }

    changeStatus = (htName, num) => {
        this.setState((prevState) => {
            const updatedHotels = prevState.hotels.map((hotel) => {
                if (hotel.hotelName === htName) {
                    return {
                        ...hotel,
                        hotelNumbers: hotel.hotelNumbers.map((number) => {
                            if (number.hotelNumber === num) {
                                return {
                                    ...number,
                                    status: number.status === 'busy' ? 'free' : 'busy',
                                };
                            }
                            return number;
                        }),
                    };
                }
                return hotel;
            });
            return { hotels: updatedHotels };
        });
    };

    freeNums() {
        const free = this.freeNumbersSearching();        
        return free.map((num) => (
            <ForLi freeHotel={num} fn={this.changeStatus} />
        ));
    }

    chng = () => {
        this.setState({ freeList:!this.state.freeList });
    }

    renderHotels() {
        const { hotels } = this.state;
        return hotels.map((hotel) => (
            <div className="col">
                <div className="row">
                    <HotelsCards key={hotel.hotelId} hotelName={hotel.hotelName} region={hotel.region} numbers={hotel.hotelNumbers} />
                </div>
            </div>
        ));
    }

    render() {
        const { hotels, freeList, inputNameHotel, inputNumber } = this.state;
        return (
            <>  
                <div className="pt-3">
                    <h2 className="col-12 h2">Отели</h2>
                </div>

                <div className="row hotels mb-5 mt-3">
                    {this.renderHotels()}
                </div>
                <div className="row mb-3">
                    <h2 className="col-12 h2">Инструменты для работы</h2>
                </div>
                <div className="row input">
                    <div className="col-4">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text mb-3" id="inputGroup-sizing-default">Изменить статус</span>
                                <input value={inputNameHotel} onChange={(e) => this.setState({ inputNameHotel: e.target.value })} type="text" className="form-control" aria-label="Default" placeholder="Название отеля" aria-describedby="inputGroup-sizing-default" />
                                <input value={inputNumber} onChange={(e) => this.setState({ inputNumber: e.target.value })} type="text" className="form-control mb-3" aria-label="Default" placeholder="Номер" aria-describedby="inputGroup-sizing-default" />
                                <button onClick={() => this.changeStatus(inputNameHotel, inputNumber)} className="btn btn-danger">Изменить</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <button onClick={this.chng} className="btn btn-primary">{freeList ? 'Скрыть список' : 'Посмотреть свободные номера'}</button>
                    </div>
                    <div className="col-3">
                       {freeList ? this.freeNums() : null} 
                    </div>
                </div>

            </>
        );
    }
}

const mount = document.querySelector('.container');
const root = ReactDOM.createRoot(mount);
root.render(<Component/>);
