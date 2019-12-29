
const LETTERS = "ABCDEFGH"
export function field_id_to_coords(id){
    var coords = [LETTERS.indexOf(id[0]), id[1] - 1]
    return coords
  }
  
export function field_coords_to_id(coords){
    var id = LETTERS[coords[0]] + String(coords[1]+1)
    return id
  }

export class Board {
    constructor() {
        
        this.fields = []
        for (var row = 0; row <= 7; row++) {
            this.fields.push([])
            for (var col = 0; col <= 7; col++) {
                this.fields[row].push({
                    "id": field_coords_to_id([row, col]),
                    //"piece" : {}
                })
            }
        }

        const PIECES = [King, Queen, Rook, Rook, Bishop, Bishop, Knight, Knight, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn]
        const TEAMS = ["black", "white"]
        this.pieces = []
        for (var team of TEAMS) {
            var offset = 16 * TEAMS.indexOf(team)
            var index = 0
            console.log(team)
            for (var i = 0; i < PIECES.length; i++) {
                var piece = PIECES[i]
                //print(piece)
                // if not first occurence of piece type
                if (PIECES.indexOf(piece) < i) {
                    index += 1
                } else {
                    index = 0
                }
                //console.log(index)
                this.pieces.push(new Piece(team, piece, index))
                var coords = [this.pieces[i + offset].x, this.pieces[i + offset].y]
                this.fields[coords[0]][coords[1]].piece = this.pieces[i + offset]

            }
        }

    }
    draw(pieces) {
        var board = document.getElementById("chessboard")

        var black_boolean = false
        for (var x in this.fields.reverse()) {
            board.innerHTML += `<div id="row-${x+1}" class="board-row"></div>`
            var row = document.getElementById(`row-${x+1}`)
            for (var y in this.fields[x]) {
                var coords = this.fields[x][y].id
                if (black_boolean) {
                    row.innerHTML += `<div id=${coords} class="board-field black" ondragover="event.preventDefault()">${coords}</div>`
                } else {
                    row.innerHTML += `<div id=${coords} class="board-field white" ondragover="event.preventDefault()">${coords}</div>`
                }



                if (typeof this.fields[x][y].piece !== "undefined") {

                    var piece = this.fields[x][y].piece
                    var piece_icon = `<i id="${piece.id}" draggable="true" class="chess-piece">${piece.type.icon}</i>`
                    document.getElementById(coords).innerHTML += piece_icon

                }
                if (y != 7) {
                    black_boolean = !black_boolean
                }
            }
        }
    }
    update() {
        for (var piece of this.pieces) {

        }
    }
}

export class Piece {
    constructor(team, piece_type, index) {
        this.team = team
        this.type = new piece_type(team, index)
        this.x = this.type.initial_coords[0]
        this.y = this.type.initial_coords[1]
        this.id = this.type.id
    }
    drag(ev) {
        console.log(ev)
        //ev.dataTransfer.setData("text", ev.target.id);
    }
}

class King {
    constructor(team, index) {
        this.icon = "K"
        this.id = team[0] + "-king"
        if (team == "white") {
            this.initial_coords = [0, 4]
        } else if (team == "black") {
            this.initial_coords = [7, 4]
        }
    }
}

class Queen {
    constructor(team, index) {
        this.icon = "Q"
        this.id = team[0] + "-queen"
        if (team == "white") {
            this.initial_coords = [0, 3]
        } else if (team == "black") {
            this.initial_coords = [7, 3]
        }
    }
}

class Rook {
    constructor(team, index) {
        this.icon = "R"
        if (team == "white") {
            var row = 0
        } else if (team == "black") {
            var row = 7
        }

        if (index == 0) {
            this.id = team[0] + "-l-rook"
            var col = 0
        } else if (index == 1) {
            this.id = team[0] + "-r-rook"
            var col = 7
        }
        this.initial_coords = [row, col]
    }
}

class Bishop {
    constructor(team, index) {
        this.icon = "B"
        if (team == "white") {
            var row = 0
        } else if (team == "black") {
            var row = 7
        }

        if (index == 0) {
            this.id = team[0] + "-l-bishop"
            var col = 2
        } else if (index == 1) {
            this.id = team[0] + "-r-bishop"
            var col = 5
        }
        this.initial_coords = [row, col]
    }
}

class Knight {
    constructor(team, index) {
        this.icon = "Kn"
        if (team == "white") {
            var row = 0
        } else if (team == "black") {
            var row = 7
        }

        if (index == 0) {
            this.id = team[0] + "-l-knight"
            var col = 1
        } else if (index == 1) {
            this.id = team[0] + "-r-knight"
            var col = 6
        }
        this.initial_coords = [row, col]
    }
}

class Pawn {
    constructor(team, index) {
        this.icon = "P"
        this.id = team[0] + "-" + index + "-pawn"
        if (team == "white") {
            var row = 1
        } else if (team == "black") {
            var row = 6
        }

        this.initial_coords = [row, index]
    }
}