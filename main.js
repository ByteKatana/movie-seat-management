import seats from './seatsInfo.json'
import Swal from 'sweetalert2'

//Objects
let ticketInfo = {
  fullname: '',
  seatNo: 0,
  price: 0,
}

//Elements
let fullnameInput = document.getElementById('fullname')
let movieSelect = document.getElementById('movie')
let showPrice = document.getElementById('showPrice')
let showSeat = document.getElementById('showSeat')
let purchaseBtn = document.getElementById('purchaseBtn')
let purchaseDiv = document.getElementById('purchaseDiv')
let leftCol = document.getElementById('leftCol')
let centerCol = document.getElementById('centerCol')
let rightCol = document.getElementById('rightCol')

//Functions
let setTicketInfo = () => {
  let selectedSeat = document.getElementById(`seat-${ticketInfo.seatNo}`)
  selectedSeat.style.backgroundColor = '#ef4444'
  seats[`${ticketInfo.seatNo - 1}`].status = 'booked'
  Swal.fire({
    title: 'Purchased',
    text: 'Ticket has been purchased!',
    icon: 'success',
    confirmButtonText: 'OK',
  })
}

let toggleSeat = (seatNo) => {
  let seatElement = document.getElementById(`seat-${seatNo}`)

  if (ticketInfo.seatNo === 0) {
    seatElement.style.backgroundColor = '#facc15'
    seats[seatNo - 1].status = 'hold'
  }

  if (ticketInfo.seatNo === seatNo) {
    seatElement.style.backgroundColor = '#22c55e'
    seats[seatNo - 1].status = 'available'
  }

  if (ticketInfo.seatNo !== 0 && ticketInfo.seatNo !== seatNo) {
    let oldSeatElement = document.getElementById(`seat-${ticketInfo.seatNo}`)
    //change status of seats
    seats[ticketInfo.seatNo - 1].status = 'available'
    seats[seatNo - 1].status = 'hold'

    //change color of seats
    oldSeatElement.style.backgroundColor = '#22c55e'
    seatElement.style.backgroundColor = '#facc15'
  }
}

document.setSeatNo = (seatNo) => {
  if (seats[seatNo - 1].status !== 'booked') {
    toggleSeat(seatNo)
    if (ticketInfo.seatNo === seatNo) {
      ticketInfo.seatNo = 0
      showSeat.textContent = 'Please select a seat '
    } else {
      ticketInfo.seatNo = seatNo
      showSeat.textContent = seatNo
    }
  } else {
    Swal.fire({
      title: 'Oops',
      text: 'This seat already booked!',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  }
}

//Event Listeners
fullnameInput.addEventListener('input', (event) => {
  ticketInfo.fullname = fullnameInput.value
})

movieSelect.addEventListener('change', (event) => {
  switch (movieSelect.value) {
    case 'barbie':
      ticketInfo.price = 25
      break
    case 'oppenheimer':
      ticketInfo.price = 30
      break

    default:
      ticketInfo.price = 0
      break
  }

  showPrice.textContent = ticketInfo.price
})
purchaseBtn.addEventListener('click', (event) => {
  if (
    ticketInfo.fullname === '' &&
    ticketInfo.price === 0 &&
    ticketInfo.seatNo === 0
  ) {
    Swal.fire({
      title: 'Oops',
      text: 'Please enter your name, select a movie and a seat',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  } else if (ticketInfo.price === 0) {
    Swal.fire({
      title: 'Oops',
      text: 'Please select a movie',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  } else if (ticketInfo.fullname === '') {
    Swal.fire({
      title: 'Oops',
      text: 'Please enter your name',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  } else if (ticketInfo.seatNo === 0) {
    Swal.fire({
      title: 'Oops',
      text: 'Please select a seat',
      icon: 'error',
      confirmButtonText: 'OK',
    })
  }

  setTicketInfo()
})

//Others
const seatsInfo = Object.entries(seats)
seatsInfo.map((seat) => {
  if (seat[1].position === 'left') {
    leftCol.innerHTML += `<span
                  id="seat-${seat[1].seatNo}" class="block w-10 h-10 m-1 ${
                    seat[1].status === 'available'
                      ? 'bg-green-500 hover:bg-green-400'
                      : seat[1].status === 'hold'
                      ? 'bg-yellow-400'
                      : 'bg-red-500 hover:bg-red-300'
                  } text-white text-center font-bold rounded-lg shadow-md cursor-pointer" onclick="setSeatNo(${
                    seat[1].seatNo
                  })"
                  >${seat[1].seatNo}</span>`
  } else if (seat[1].position === 'center') {
    centerCol.innerHTML += `<span
                  id="seat-${seat[1].seatNo}" class="block w-10 h-10 m-1 ${
                    seat[1].status === 'available'
                      ? 'bg-green-500 hover:bg-green-400'
                      : seat[1].status === 'hold'
                      ? 'bg-yellow-400'
                      : 'bg-red-500 hover:bg-red-300'
                  } text-white text-center font-bold rounded-lg shadow-md cursor-pointer" onclick="setSeatNo(${
                    seat[1].seatNo
                  })"
                  >${seat[1].seatNo}</span>`
  } else if (seat[1].position === 'right') {
    rightCol.innerHTML += `<span
                  id="seat-${seat[1].seatNo}" class="block w-10 h-10 m-1 ${
                    seat[1].status === 'available'
                      ? 'bg-green-500 hover:bg-green-400'
                      : seat[1].status === 'hold'
                      ? 'bg-yellow-400'
                      : 'bg-red-500 hover:bg-red-300'
                  } text-white text-center font-bold rounded-lg shadow-md cursor-pointer" onclick="setSeatNo(${
                    seat[1].seatNo
                  })"
                  >${seat[1].seatNo}</span>`
  }
})
