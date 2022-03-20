!function t(e, n, o) {
    function i(a, s) {
        if (!n[a]) {
            if (!e[a]) {
                var u = "function" == typeof require && require;
                if (!s && u)
                    return u(a, !0);
                if (r)
                    return r(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = n[a] = {
                exports: {}
            };
            e[a][0].call(c.exports, function(t) {
                var n = e[a][1][t];
                return i(n || t)
            }, c, c.exports, t, e, n, o)
        }
        return n[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < o.length; a++)
        i(o[a]);
    return i
}({
    1: [function(t, e, n) {
        (function() {
            this.gref_ = {
                CONFIG: [[[["sel-algo", "maze-gen"], ["ma-clear-btn", "ma-play-btn"]], ["visualizer", "grid", "ma-ctrl"]]],
            };
            this.gref_ = this.gref_ || {};
            (function(_) {
                try {
                    "use strict";
                    var Kd, Kr, Km;
                    _ && _.CONFIG ? Kd = _.CONFIG[0] || {} : Kd = [];
                    Kd[0] && (Kr = Kd[0][0], Kl = Kd[0][1], Km = Kd[1]);
            
                    _.sivz = (a) => {
                        return document.getElementById(a)
                    };
            
                    _.dach = (a, b) => {
                        a.appendChild(b);
                    };
            
                    _.grdarr = (a, b) => {
                        return new Array(a).fill(0).map(() => new Array(b).fill(0));
                    };
            
                    _.plcl = (a, b) => {
                        return document.querySelector(".x_" + a.toString(10) + ".y_" + b.toString(10));
                    };
            
                    _.csz = () => {
                        return 50
                    };
            
                    _.lps = (a, b) => {
                        return ((a+b) % 2 == 0 ? "cell cell_1" : "cell cell_2") + " x_"+b.toString(10)+" y_"+a.toString(10)
                    };
            
                    _.wid = (a) => {
                        return a.getBoundingClientRect().width
                    };
            
                    _.flpt = (a) => {
                        a.style.width = (window.innerWidth).toString(10) + "px";
                        a.style.height = (window.innerHeight).toString(10) + "px";
                    };
            
                    _.frmt = (a) => {
                        a.style.width = (this.cell_size * this.grid_size_x).toString(10) + "px";
                        a.style.height = (this.cell_size * this.grid_size_y).toString(10) + "px";
                    };
            
                    _.stprg = (a) => {
                        if (a[0] % 2 == 0) a[0] += 1;
                        if (a[1] % 2 == 0) a[1] -= 1;
                    };
            
                    _.dlt = (a) => {
                        a.remove();
                    };
            
                    _.rltp = (t) => {
                        let l = document.createElement('div');
                        l.classList.add('ad-error-pn-c');
                        document.body.appendChild(l);
                        l.innerHTML = '<div class="ad-error-panel"><div class="ad-err"><p>'+t+'</p></div><div id="ad-err-close-btn" class="ad-err-close">Close</div></div>';
                        document.getElementById('ad-err-close-btn').onclick = () => {_.clrg(), document.body.removeChild(l)};
                    }
            
                    _.clplc = (cell) => {
                        let text_x = cell.classList[2];
                        let text_y = cell.classList[3];
            
                        text_x = text_x.split("x_")[1];
                        text_y = text_y.split("y_")[1];
            
                        return [parseInt(text_x, 10), parseInt(text_y, 10)];
                    };
            
                    _.adwl = (x, y) => {
                        let cell = _.plcl(x, y);
            
                        if (!cell.classList.contains("start") && !cell.classList.contains("target")) {
                            this.grid[x][y] = -1;
                            cell.classList.add("cell_wall");
                        }
                    };
            
                    _.rmvw = (x, y) => {
                        this.grid[x][y] = 0;
                        _.plcl(x, y).classList.remove("cell_wall");
                    };
            
                    _.clrg = () => {
                        if (!this.grid_clean) {
                            for (let i = 0; i < this.timeouts.length; i++)
                                clearTimeout(this.timeouts[i]);
            
                            this.timeouts = [];
                            clearInterval(this.my_interval);
            
                            for (let i = 0; i < this.grid.length; i++) {
                                for (let j = 0; j < this.grid[0].length; j++) {
                                    if (this.grid[i][j] > -1){
                                        _.rmvw(i, j);
                                        _.plcl(i, j).classList.remove("cell_algo");
                                        _.plcl(i, j).classList.remove("cell_path");
                                    } else if (this.grid[i][j] < -1) {
                                        _.adwl(i, j);
                                    }
            
                                    _.plcl(i, j).classList.remove("visited_cell");
                                }
                            }
            
                            this.grid_clean = true;
                        }
                    };
            
                    _.gtnd = (x, y) => {
                        if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length)
                            return grid[x][y];
            
                        return -2;
                    };
            
                    _.gridProps = () => {
                        let r = (window.innerWidth - _.wid(_.sivz(Km[2]))) / window.innerHeight;
            
                        if (r > 1) {
                            this.grid_size_x = _.csz();
                            this.grid_size_y = Math.floor(_.csz() / r);
                    
                            if (this.grid_size_y % 2 == 0)
                                this.grid_size_y += 1;
                    
                            this.cell_size = Math.floor((window.innerWidth - _.sivz(Km[2])) / _.csz());
                        } else {
                            this.grid_size_x = Math.floor(_.csz() * r);
                            this.grid_size_y = _.csz();
                    
                            if (this.grid_size_x % 2 == 0)
                                this.grid_size_x += 1;
                    
                            this.cell_size = Math.floor(window.innerHeight / _.csz());
                        }
                    };
            
                    _.gen = () => {
                        _.flpt(_.sivz(Km[0]));
                        _.gridProps();
            
                        this.timeouts = [];
            
                        this.table = document.createElement("table");
                        this.table.id = "grid-table";
            
                        for (let i = 0; i < this.grid_size_y; i++) {
                            let row = document.createElement("tr");
            
                            for (let j = 0; j < this.grid_size_x; j++) {
                                let cell = document.createElement("td");
                                cell.setAttribute("class", _.lps(i, j));
                                row.appendChild(cell);
                            }
            
                            this.table.appendChild(row);
                        }
                        
                        let vg = document.createElement("div");
                        vg.setAttribute("id", "grid");
                        _.dach(vg, this.table);
                        _.sivz(Km[0]).appendChild(vg);
            
                        this.grid = _.grdarr(this.grid_size_x, this.grid_size_y);
            
                        this.start_pos = [Math.floor(this.grid_size_x / 4), Math.floor(this.grid_size_y / 2)];
                        this.target_pos = [Math.floor((3 * this.grid_size_x) / 4), Math.floor(this.grid_size_y / 2)];
            
                        _.stprg(this.start_pos);
                        _.stprg(this.target_pos);
            
                        _.plcl(this.start_pos[0], this.start_pos[1]).classList.add("start");
                        _.plcl(this.target_pos[0], this.target_pos[1]).classList.add("target");
            
                        _.frmt(_.sivz(Km[0]));
            
                        _.vsli(_.sivz("grid-table"));
            
                        _.melst();
                    };
            
                    _.evtn = (event) => {
                        event.preventDefault();
                    
                        if (this.clicking && event.target.classList.contains("cell")) {
                            _.clrg();
                            let place = _.clplc(event.target);
                    
                            if (this.moving_start && !event.target.classList.contains("target")) {
                                this.start_pos = place;
                                document.querySelector(".start").classList.remove("start");
                                event.target.classList.add("start");
                    
                                if (this.grid[place[0]][place[1]] < 0) {
                                    _.sivz(Kr[1]).value = "0";
                                    // _.rmvw(place[0], place[1]);
                                }
                    
                                if (this.generating)
                                    _.sivz(Kr[1]).value = "0";
                    
                                this.generating = false;
                            } else if (this.moving_target && !event.target.classList.contains("start")) {
                                this.target_pos = place;
                                document.querySelector(".target").classList.remove("target");
                                event.target.classList.add("target");
                    
                                if (this.grid[place[0]][place[1]] < 0) {
                                    _.sivz(Kr[1]).value = "0";
                                    // _.rmvw(place[0], place[1]);
                                }
                    
                                if (this.generating)
                                    _.sivz(Kr[1]).value = "0";
                    
                                this.generating = false;
                            } else {
                                _.sivz(Kr[1]).value = "0";
                    
                                if (this.grid[place[0]][place[1]] == 0)
                                    _.adwl(place[0], place[1]);
                                else
                                    _.rmvw(place[0], place[1])
                            }
                        }
                    };
            
                    _.eved = (event) => {
                        event.preventDefault();
            
                        if (!this.moving_start && !this.moving_target) {
                            _.rmvw(this.start_pos[0], this.start_pos[1]);
                            _.rmvw(this.target_pos[0], this.target_pos[1]);
                        }
                    };
            
                    _.vsli = (a) => {
                        a.addEventListener('mousedown', event => {
                            event.preventDefault();
                            this.clicking = true;
                    
                            if (event.target.classList.contains("start"))
                                this.moving_start = true;
                    
                            if (event.target.classList.contains("target"))
                                this.moving_target = true;
                    
                            _.evtn(event);
                        });
                    
                        a.addEventListener('mouseup', event => {
                            event.preventDefault();
                            this.clicking = false;
                            this.moving_start = false;
                            this.moving_target = false;
                            _.eved(event);
                        });
                    
                        a.addEventListener('mouseover', event => {
                            _.evtn(event);
                        });
                    
                        a.addEventListener('mouseleave', event => {
                            event.preventDefault();
                            this.clicking = false;
                            this.moving_start = false;
                            this.moving_target = false;
                            _.eved(event);
                        });
            
                        window.addEventListener('resize', () => {
                            _.clre();
                        });
                    };
            
                    _.hdc = () => {
                        for (let i = 0; i < this.timeouts.length; i++)
                            clearTimeout(this.timeouts[i]);
            
                        this.timeouts = [];
                        clearInterval(this.my_interval);
                        _.dlt(_.sivz("grid-table"));
            
                        if (window.innerWidth > _.wid(_.sivz(Km[2])) + 50) {
                            _.gen();
                        }
                    };
            
                    _.clre = () => {
                        _.sivz(Kr[1]).value = "0";
                        _.hdc();
                    };
            
                    _.melst = () => {
                        _.sivz(Kr[1]).addEventListener('change', event => {
                            _.mzgn();
                        });
            
                        _.sivz(Kl[0]).onclick = () => {
                            let start_temp = this.start_pos;
                            let target_temp = this.target_pos;
                            _.clre();
                            _.plcl(this.start_pos[0], this.start_pos[1]).classList.remove("start");
                            _.plcl(start_temp[0], start_temp[1]).classList.add("start");
                            _.plcl(this.target_pos[0], this.target_pos[1]).classList.remove("target");
                            _.plcl(target_temp[0], target_temp[1]).classList.add("target");
                            this.start_pos = start_temp;
                            this.target_pos = target_temp;
                        };
                        
                        _.sivz(Kl[1]).onclick = () => {
                            if (this.generating)
                                _.sivz(Kr[1]).value = "0";
            
                            this.generating = false;
                            _.clrg();
                            _.mzslv();
                        };
                    };
            
            
                    _.dstnc = (point_1, point_2) => {
                        return Math.sqrt(Math.pow(point_2[0] - point_1[0], 2) + Math.pow(point_2[1] - point_1[1], 2));
                    };
            
                    _.mzsli = (a) => {
                        this.my_interval = window.setInterval(function() {
                            if (!this.path) {
                                _.plcl(this.node_list[this.node_list_index][0], this.node_list[this.node_list_index][1]).classList.add("cell_algo");
                                this.node_list_index++;
            
                                if (this.node_list_index == this.node_list.length) {
                                    if (!this.found) {
                                        clearInterval(this.my_interval);
                                    } else {
                                        this.path = true;
                                        _.plcl(this.start_pos[0], this.start_pos[1]).classList.add("cell_path");
                                    }
                                }
                            } else {
                                if (this.path_list_index == this.path_list.length) {
                                    _.plcl(this.target_pos[0], this.target_pos[1]).classList.add("cell_path");
                                    clearInterval(this.my_interval);
                                    return;
                                }
            
                                _.plcl(this.path_list[this.path_list_index][0], this.path_list[this.path_list_index][1]).classList.remove("cell_algo");
                                _.plcl(this.path_list[this.path_list_index][0], this.path_list[this.path_list_index][1]).classList.add("cell_path");
                                this.path_list_index++;
                            }
                        }, 10);
                        
                        if (a) {
                            setTimeout(() => {
                                _.rltp("This maze has no solution ! Try another one :)");
                            }, 1000);
                        } 
                    };
            
                    _.breadth_first = () => {
                        let frontier = [this.start_pos];
                        let nopath = false;
                        this.grid[this.start_pos[0]][this.start_pos[1]] = 1;
            
                        do {
                            let list = _.gtnb(frontier[0], 1);
                            frontier.splice(0, 1);
            
                            for (let i = 0; i < list.length; i++)
                                if (_.gtnd(list[i][0], list[i][1]) == 0) {
                                    frontier.push(list[i]);
                                    this.grid[list[i][0]][list[i][1]] = i + 1;
            
                                    if (list[i][0] == this.target_pos[0] && list[i][1] == this.target_pos[1]) {
                                        this.found = true;
                                        break;
                                    }
            
                                    this.node_list.push(list[i]);
                                }
                        } while (frontier.length > 0 && !this.found)
            
                        if (this.found) {
                            let current_node = this.target_pos;
            
                            while (current_node[0] != this.start_pos[0] || current_node[1] != this.start_pos[1]) {
                                switch (this.grid[current_node[0]][current_node[1]]) {
                                    case 1: current_node = [current_node[0], current_node[1] + 1]; break;
                                    case 2: current_node = [current_node[0] - 1, current_node[1]]; break;
                                    case 3: current_node = [current_node[0], current_node[1] - 1]; break;
                                    case 4: current_node = [current_node[0] + 1, current_node[1]]; break;
                                    default: break;
                                }
            
                                this.path_list.push(current_node);
                            }
            
                            this.path_list.pop();
                            this.path_list.reverse();
                        } else {
                            nopath = true
                        }
            
                        _.mzsli(nopath);
                    };
            
                    _.bidirectional_breadth_first = () => {
                        let current_cell;
                        let start_end;
                        let target_end;
                        let frontier = [this.start_pos, this.target_pos];
                        let nopath = false;
                        this.grid[this.target_pos[0]][this.target_pos[1]] = 1;
                        this.grid[this.start_pos[0]][this.start_pos[1]] = 11;
            
                        do {
                            current_cell = frontier[0];
                            let list = _.gtnb(current_cell, 1);
                            frontier.splice(0, 1);
            
                            for (let i = 0; i < list.length; i++) {
                                if (_.gtnd(list[i][0], list[i][1]) == 0) {
                                    frontier.push(list[i]);
            
                                    if (this.grid[current_cell[0]][current_cell[1]] < 10) {
                                        this.grid[list[i][0]][list[i][1]] = i + 1;
                                    } else {
                                        this.grid[list[i][0]][list[i][1]] = 11 + i;
                                    }
            
                                    this.node_list.push(list[i]);
                                } else if (_.gtnd(list[i][0], list[i][1]) > 0) {
                                    if (this.grid[current_cell[0]][current_cell[1]] < 10 && _.gtnd(list[i][0], list[i][1]) > 10) {
                                        start_end = current_cell;
                                        target_end = list[i];
                                        this.found = true;
                                        break;
                                    } else if (this.grid[current_cell[0]][current_cell[1]] > 10 && _.gtnd(list[i][0], list[i][1]) < 10) {
                                        start_end = list[i];
                                        target_end = current_cell;
                                        this.found = true;
                                        break;
                                    }
                                }
                            }
                        } while (frontier.length > 0 && !this.found)
            
                        if (this.found) {
                            let targets = [this.target_pos, this.start_pos];
                            let starts = [start_end, target_end];
            
                            for (let i = 0; i < starts.length; i++) {
                                let current_node = starts[i];
            
                                while (current_node[0] != targets[i][0] || current_node[1] != targets[i][1]) {
                                    this.path_list.push(current_node);
            
                                    switch (this.grid[current_node[0]][current_node[1]] - (i * 10)) {
                                        case 1: current_node = [current_node[0], current_node[1] + 1]; break;
                                        case 2: current_node = [current_node[0] - 1, current_node[1]]; break;
                                        case 3: current_node = [current_node[0], current_node[1] - 1]; break;
                                        case 4: current_node = [current_node[0] + 1, current_node[1]]; break;
                                        default: break;
                                    }
                                }
            
                                if (i == 0)
                                    this.path_list.reverse();
                            }
            
                            this.path_list.reverse();
                        } else {
                            nopath = true
                        }
            
                        _.mzsli(nopath);
                    };
            
                    _.greedy_best_first = () => {
                        let frontier = [this.start_pos];
                        let nopath = false;
                        this.grid[this.start_pos[0]][this.start_pos[1]] = 1;
            
                        do {
                            frontier.sort(function(a, b) {
                                return _.dstnc(a, this.target_pos) - _.dstnc(b, this.target_pos);
                            });
            
                            let list = _.gtnb(frontier[0], 1);
                            frontier.splice(0, 1);
            
                            for (let i = 0; i < list.length; i++) {
                                if (_.gtnd(list[i][0], list[i][1]) == 0) {
                                    frontier.push(list[i]);
                                    this.grid[list[i][0]][list[i][1]] = i + 1;
            
                                    if (list[i][0] == this.target_pos[0] && list[i][1] == this.target_pos[1]) {
                                        this.found = true;
                                        break;
                                    }
            
                                    this.node_list.push(list[i]);
                                }
                            }
                        } while (frontier.length > 0 && !this.found)
            
                        if (this.found) {
                            let current_node = this.target_pos;
            
                            while (current_node[0] != this.start_pos[0] || current_node[1] != this.start_pos[1]) {
                                switch (this.grid[current_node[0]][current_node[1]]) {
                                    case 1: current_node = [current_node[0], current_node[1] + 1]; break;
                                    case 2: current_node = [current_node[0] - 1, current_node[1]]; break;
                                    case 3: current_node = [current_node[0], current_node[1] - 1]; break;
                                    case 4: current_node = [current_node[0] + 1, current_node[1]]; break;
                                    default: break;
                                }
            
                                this.path_list.push(current_node);
                            }
            
                            this.path_list.pop();
                            this.path_list.reverse();
                        } else {
                            nopath = true
                        }
            
                        _.mzsli(nopath);
                    };
            
                    _.dijkstra = () => {
                        _.greedy_best_first();
                    };
            
                    _.a_star = () => {
                        let frontier = [this.start_pos];
                        let nopath = false;
                        let cost_grid = new Array(this.grid.length).fill(0).map(() => new Array(this.grid[0].length).fill(0));
                        this.grid[this.start_pos[0]][this.start_pos[1]] = 1;
            
                        do {
                            frontier.sort(function(a, b) {
                                let a_value = cost_grid[a[0]][a[1]] + _.dstnc(a, this.target_pos) * Math.sqrt(2);
                                let b_value = cost_grid[b[0]][b[1]] + _.dstnc(b, this.target_pos) * Math.sqrt(2);
                                return a_value - b_value;
                            });
            
                            let current_cell = frontier[0];
                            let list = _.gtnb(current_cell, 1);
                            frontier.splice(0, 1);
            
                            for (let i = 0; i < list.length; i++) {
                                if (_.gtnd(list[i][0], list[i][1]) == 0) {
                                    frontier.push(list[i]);
                                    this.grid[list[i][0]][list[i][1]] = i + 1;
                                    cost_grid[list[i][0]][list[i][1]] = cost_grid[current_cell[0]][current_cell[1]] + 1;
            
                                    if (list[i][0] == this.target_pos[0] && list[i][1] == this.target_pos[1]) {
                                        this.found = true;
                                        break;
                                    }
            
                                    this.node_list.push(list[i]);
                                }
                            }
                        } while (frontier.length > 0 && !this.found)
            
                        if (this.found) {
                            let current_node = this.target_pos;
            
                            while (current_node[0] != this.start_pos[0] || current_node[1] != this.start_pos[1]) {
                                switch (this.grid[current_node[0]][current_node[1]]) {
                                    case 1: current_node = [current_node[0], current_node[1] + 1]; break;
                                    case 2: current_node = [current_node[0] - 1, current_node[1]]; break;
                                    case 3: current_node = [current_node[0], current_node[1] - 1]; break;
                                    case 4: current_node = [current_node[0] + 1, current_node[1]]; break;
                                    default: break;
                                }
            
                                this.path_list.push(current_node);
                            }
            
                            this.path_list.pop();
                            this.path_list.reverse();
                        } else {
                            nopath = true
                        }
            
                        _.mzsli(nopath);
                    };
            
                    _.mzslv = () => {
                        _.clrg();
                        this.grid_clean = false;
            
                        this.node_list = [];
                        this.node_list_index = 0;
                        this.path_list = [];
                        this.path_list_index = 0;
                        this.found = false;
                        this.path = false;
            
                        if ((Math.abs(this.start_pos[0] - this.target_pos[0]) == 0 && Math.abs(this.start_pos[1] - this.target_pos[1]) == 1) || (Math.abs(this.start_pos[0] - this.target_pos[0]) == 1 && Math.abs(this.start_pos[1] - this.target_pos[1]) == 0)) {
                                _.plcl(this.start_pos[0], this.start_pos[1]).classList.add("cell_path");
                                _.plcl(this.target_pos[0], this.target_pos[1]).classList.add("cell_path");
                        } else if (_.sivz(Kr[0]).value == "1") {
                            _.breadth_first();
                        } else if (_.sivz(Kr[0]).value == "2") {
                            _.bidirectional_breadth_first(); 
                        } else if (_.sivz(Kr[0]).value == "3") {
                            _.greedy_best_first(); 
                        } else if (_.sivz(Kr[0]).value == "4") {
                            _.dijkstra(); 
                        } else if (_.sivz(Kr[0]).value == "5") {
                            _.a_star();
                        }
                    };
            
                    _.gtnd = (x, y) => {
                        if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length)
                            return this.grid[x][y];
            
                        return -2;
                    };
            
                    _.gtnb = (cell, distance) => {
                        let up = [cell[0], cell[1] - distance];
                        let right = [cell[0] + distance, cell[1]];
                        let down = [cell[0], cell[1] + distance];
                        let left = [cell[0] - distance, cell[1]];
                        return [up, right, down, left];
                    };
            
                    _.flid = () => {
                        for (let i = 0; i < this.grid.length; i++)
                            for (let j = 0; j < this.grid[0].length; j++)
                                _.adwl(i, j);
                    };
            
                    _.flwa = () => {
                        for (let i = 0; i < this.grid.length; i++)
                            for (let j = 0; j < this.grid[0].length; j++)
                                if (i % 2 == 0 || j % 2 == 0)
                                    _.adwl(i, j);
                    };
            
                    _.elcn = () => {
                        for (let i = 0; i < this.grid.length; i++) {
                            _.adwl(i, 0);
                            _.adwl(i, this.grid[0].length - 1);
                        }
            
                        for (let j = 0; j < this.grid[0].length; j++) {
                            _.adwl(0, j);
                            _.adwl(this.grid.length - 1, j);
                        }
                    };
            
                    _.gtni = (cell, distance) => {
                        let up = [cell[0], cell[1] - distance];
                        let right = [cell[0] + distance, cell[1]];
                        let down = [cell[0], cell[1] + distance];
                        let left = [cell[0] - distance, cell[1]];
                        return [up, right, down, left];
                    };
            
                    _.drni = (min, max) => {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min)) + min;
                    };
            
                    _.randomized_depth_first = () => {
                        _.flid();
                        let current_cell = [1, 1];
                        _.rmvw(current_cell[0], current_cell[1]);
                        this.grid[current_cell[0]][current_cell[1]] = 1;
                        let stack = [current_cell];
            
                        this.my_interval = window.setInterval(function() {
                            if (stack.length == 0) {
                                clearInterval(this.my_interval);
                                _.clrg();
                                this.generating = false;
                                return;
                            }
            
                            current_cell = stack.pop();
                            let neighbours = [];
                            let list = _.gtni(current_cell, 2);
            
                            for (let i = 0; i < list.length; i++)
                                if (_.gtnd(list[i][0], list[i][1]) == -1 || _.gtnd(list[i][0], list[i][1]) == 0)
                                    neighbours.push(list[i]);
            
                            if (neighbours.length > 0) {
                                stack.push(current_cell);
                                let chosen_cell = neighbours[_.drni(0, neighbours.length)];
                                _.rmvw((current_cell[0] + chosen_cell[0]) / 2, (current_cell[1] + chosen_cell[1]) / 2);
                                _.rmvw(chosen_cell[0], chosen_cell[1]);
                                this.grid[chosen_cell[0]][chosen_cell[1]] = 1;
                                stack.push(chosen_cell);
                            } else {
                                _.rmvw(current_cell[0], current_cell[1]);
                                this.grid[current_cell[0]][current_cell[1]] = 2;
                                _.plcl(current_cell[0], current_cell[1]).classList.add("visited_cell");
            
                                for (let i = 0; i < list.length; i++) {
                                    let wall = [(current_cell[0] + list[i][0]) / 2, (current_cell[1] + list[i][1]) / 2]
            
                                    if (_.gtnd(list[i][0], list[i][1]) == 2 && _.gtnd(wall[0], wall[1]) > -1)
                                        _.plcl(wall[0], wall[1]).classList.add("visited_cell");
                                }
                            }
                        }, 16);
                    };
            
                    _.kruskal_algorithm = () => {
                        _.flwa();
                        let nb_areas = 0;
                        let wall_list = [];
            
                        for (let i = 1; i < this.grid.length - 1; i++) {
                            for (let j = 1; j < this.grid[0].length - 1; j++) {
                                if (i % 2 == 1 && j % 2 == 1) {
                                    nb_areas++;
                                    this.grid[i][j] = nb_areas;
                                    _.plcl(i, j).classList.add("visited_cell");
                                }
            
                                if ((i + j) % 2 == 1)
                                    wall_list.push([i, j]);
                            }
                        }
            
                        this.my_interval = window.setInterval(function() {
                            while (true) {
                                if (nb_areas == 1) {
                                    clearInterval(this.my_interval);
                                    _.clrg();
                                    this.generating = false;
                                    return;
                                }
            
                                let index = _.drni(0, wall_list.length);
                                let wall = wall_list[index];
                                wall_list.splice(index, 1);
                                let cell_pair;
            
                                if (this.grid[wall[0] - 1][wall[1]] > -1)
                                    cell_pair = [grid[wall[0] - 1][wall[1]], grid[wall[0] + 1][wall[1]]];
                                else
                                    cell_pair = [grid[wall[0]][wall[1] - 1], grid[wall[0]][wall[1] + 1]];
            
                                if (cell_pair[0] != cell_pair[1]) {
                                    for (let i = 1; i < this.grid.length - 1; i += 2)
                                        for (let j = 1; j < this.grid[0].length - 1; j += 2)
                                            if (this.grid[i][j] == cell_pair[0])
                                            this.grid[i][j] = cell_pair[1];
            
                                    _.rmvw(wall[0], wall[1]);
                                    _.plcl(wall[0], wall[1]).classList.add("visited_cell");
                                    nb_areas--;
                                    return;
                                }
                            }
                        }, 29);
                    };
            
                    _.prim_algorithm = () => {
                        _.flid();
                        let first_cell = [1, 1];
                        _.rmvw(first_cell[0], first_cell[1]);
                        _.plcl(first_cell[0], first_cell[1]).classList.add("visited_cell");
                        this.grid[first_cell[0]][first_cell[1]] = 1;
                        let wall_list = [];
                        let list = _.gtni(first_cell, 1);
            
                        for (let i = 0; i < list.length; i++)
                            if (list[i][0] > 0 && list[i][0] < grid.length - 1 && list[i][1] > 0 && list[i][1] < grid[0].length - 1)
                                wall_list.push(list[i]);
            
                        this.my_interval = window.setInterval(function() {
                            while (true) {
                                if (wall_list.length == 0) {
                                    clearInterval(this.my_interval);
                                    _.clrg();
                                    this.generating = false;
                                    return;
                                }
            
                                let index = _.drni(0, wall_list.length);
                                let wall = wall_list[index];
                                wall_list.splice(index, 1);
                                let cell_pair;
            
                                if (wall[0] % 2 == 0)
                                    cell_pair = [[wall[0] - 1, wall[1]], [wall[0] + 1, wall[1]]];
                                else
                                    cell_pair = [[wall[0], wall[1] - 1], [wall[0], wall[1] + 1]];
            
                                let new_cell;
                                let valid = false;
            
                                if (this.grid[cell_pair[0][0]][cell_pair[0][1]] < 1) {
                                    new_cell = cell_pair[0];
                                    valid = true;
                                } else if (this.grid[cell_pair[1][0]][cell_pair[1][1]] < 1) {
                                    new_cell = cell_pair[1];
                                    valid = true;
                                }
            
                                if (valid) {
                                    _.rmvw(wall[0], wall[1]);
                                    _.rmvw(new_cell[0], new_cell[1]);
                                    _.plcl(wall[0], wall[1]).classList.add("visited_cell");
                                    _.plcl(new_cell[0], new_cell[1]).classList.add("visited_cell");
                                    grid[new_cell[0]][new_cell[1]] = 1;
                                    let list = _.gtni(new_cell, 1);
            
                                    for (let i = 0; i < list.length; i++)
                                        if (list[i][0] > 0 && list[i][0] < this.grid.length - 1 && list[i][1] > 0 && list[i][1] < this.grid[0].length - 1)
                                            wall_list.push(list[i]);

                                    return;
                                }
                            }
                        }, 28);
                    };
            
                    _.wilson_algorithm = () => {
                        _.flid();
                        let cell_list = [];
            
                        for (let i = 1; i < this.grid.length - 1; i += 2)
                            for (let j = 1; j < this.grid[0].length - 1; j += 2)
                                cell_list.push([i, j]);
            
                        let first_cell = cell_list[0];
                        cell_list.splice(0, 1);
                        this.grid[first_cell[0]][first_cell[1]] = 10;
                        _.plcl(first_cell[0], first_cell[1]).classList.add("visited_cell");
                        let current_cell = cell_list[_.drni(0, cell_list.length)];
                        let random_walk = true;
                        let first_step = current_cell;
                        let new_way_list = [];
            
                        this.my_interval = window.setInterval(function() {
                            if (cell_list.length == 0) {
                                clearInterval(this.my_interval);
                                _.clrg();
                                this.generating = false;
                                return;
                            }
            
                            if (random_walk) {
                                while (true) {
                                    let list = _.gtni(current_cell, 2);
                                    let index;
                                    let chosen_cell;
            
                                    do {
                                        index = _.drni(0, list.length);
                                        chosen_cell = list[index];
                                    } while (_.gtnd(chosen_cell[0], chosen_cell[1]) == -2)
            
                                    this.grid[current_cell[0]][current_cell[1]] = -(index + 3);
            
                                    if (this.grid[chosen_cell[0]][chosen_cell[1]] == 10) {
                                        random_walk = false;
                                        current_cell = first_step;
                                        return;
                                    } else
                                        current_cell = chosen_cell;
                                }
                            } else {
                                if (this.grid[current_cell[0]][current_cell[1]] == 10) {
                                    current_cell = cell_list[_.drni(0, cell_list.length)];
                                    random_walk = true;
                                    first_step = current_cell;
            
                                    for (let i = 0; i < new_way_list.length; i++)
                                        _.plcl(new_way_list[i][0], new_way_list[i][1]).classList.add("visited_cell");
            
                                    new_way_list = [];
                                } else {
                                    let index = -this.grid[current_cell[0]][current_cell[1]] - 3;
                                    let next_cell = _.gtni(current_cell, 2)[index];
                                    let wall = [(current_cell[0] + next_cell[0]) / 2, (current_cell[1] + next_cell[1]) / 2];
                                    new_way_list.push(current_cell);
                                    new_way_list.push(wall);
                                    _.rmvw(current_cell[0], current_cell[1]);
                                    _.rmvw(wall[0], wall[1]);
                                    this.grid[current_cell[0]][current_cell[1]] = 10;
            
                                    for (let i = 0; i < cell_list.length; i++)
                                        if (cell_list[i][0] == current_cell[0] && cell_list[i][1] == current_cell[1]) {
                                            cell_list.splice(i, 1);
                                            break;
                                        }
            
                                    current_cell = next_cell;
                                }
                            }
                        }, 18);
                    };
            
                    _.aldous_broder_algorithm = () => {
                        _.flid();
                        let cells_nb = ((this.grid.length - 1) / 2) * ((this.grid[0].length - 1) / 2);
                        let current_cell = [1, 1];
                        _.rmvw(current_cell[0], current_cell[1]);
                        this.grid[current_cell[0]][current_cell[1]] = 1;
                        _.plcl(current_cell[0], current_cell[1]).classList.add("visited_cell");
                        cells_nb--;
            
                        this.my_interval = window.setInterval(function() {
                            if (cells_nb == 0) {
                                clearInterval(this.my_interval);
                                _.clrg();
                                this.generating = false;
                                return;
                            }
            
                            while (true) {
                                let neighbours = [];
                                let list = _.gtni(current_cell, 2);
            
                                for (let i = 0; i < list.length; i++)
                                    if (_.gtnd(list[i][0], list[i][1]) != -2)
                                        neighbours.push(list[i]);
            
                                let chosen_cell = neighbours[_.drni(0, neighbours.length)];
            
                                if (this.grid[chosen_cell[0]][chosen_cell[1]] != 1) {
                                    let wall = [(current_cell[0] + chosen_cell[0]) / 2, (current_cell[1] + chosen_cell[1]) / 2];
                                    _.rmvw(wall[0], wall[1]);
                                    _.plcl(wall[0], wall[1]).classList.add("visited_cell");
                                    _.rmvw(chosen_cell[0], chosen_cell[1]);
                                    this.grid[chosen_cell[0]][chosen_cell[1]] = 1;
                                    _.plcl(chosen_cell[0], chosen_cell[1]).classList.add("visited_cell");
                                    cells_nb--;
                                    current_cell = chosen_cell;
                                    return;
                                }
            
                                current_cell = chosen_cell;
                            }
                        }, 28);
                    };
            
                    _.recursive_division = () => {
                        _.elcn();
                        let time = 0;
                        let step = 17;
                        this.timeouts = [];
            
                        sub_recursive_division = (x_min, y_min, x_max, y_max) => {
                            if (y_max - y_min > x_max - x_min) {
                                let x = _.drni(x_min + 1, x_max);
                                let y = _.drni(y_min + 2, y_max - 1);
            
                                if ((x - x_min) % 2 == 0)
                                    x += (_.drni(0, 2) == 0 ? 1 : -1);
            
                                if ((y - y_min) % 2 == 1)
                                    y += (_.drni(0, 2) == 0 ? 1 : -1);
            
                                for (let i = x_min + 1; i < x_max; i++)
                                    if (i != x) {
                                        time += step;
                                        this.timeouts.push(setTimeout(function() { _.adwl(i, y); }, time));
                                    }
            
                                if (y - y_min > 2)
                                    sub_recursive_division(x_min, y_min, x_max, y);
            
                                if (y_max - y > 2)
                                    sub_recursive_division(x_min, y, x_max, y_max);
                            } else {
                                let x = _.drni(x_min + 2, x_max - 1);
                                let y = _.drni(y_min + 1, y_max);
            
                                if ((x - x_min) % 2 == 1)
                                    x += (_.drni(0, 2) == 0 ? 1 : -1);
            
                                if ((y - y_min) % 2 == 0)
                                    y += (_.drni(0, 2) == 0 ? 1 : -1);
            
                                for (let i = y_min + 1; i < y_max; i++)
                                    if (i != y) {
                                        time += step;
                                        this.timeouts.push(setTimeout(function() { _.adwl(x, i); }, time));
                                    }
            
                                if (x - x_min > 2)
                                    sub_recursive_division(x_min, y_min, x, y_max);
            
                                if (x_max - x > 2)
                                    sub_recursive_division(x, y_min, x_max, y_max);
                            }
                        }
            
                        sub_recursive_division(0, 0, this.grid.length - 1, this.grid[0].length - 1);
                        this.timeouts.push(setTimeout(function() { this.generating = false; this.timeouts = [] }, time));
                    };
            
                    _.mdnf = (a) => {
                        if (a[0] % 2 == 0) {
                            if (a[0] == this.grid.length - 1)
                                a[0] -= 1;
                            else
                                a[0] += 1;
                        }
                        if (a[1] % 2 == 0) {
                            if (a[1] == 0)
                                a[1] += 1;
                            else
                                a[1] -= 1;
                        }
                        return a
                    };
            
                    _.mzgn = () => {
                        let start_temp = this.start_pos;
                        let target_temp = this.target_pos;
                        _.hdc();
                        this.generating = true;
                        
                        _.mdnf(start_temp);            
                        _.mdnf(target_temp);
                        
                        _.plcl(this.start_pos[0], this.start_pos[1]).classList.remove("start");
                        _.plcl(start_temp[0], start_temp[1]).classList.add("start");
                        _.plcl(this.target_pos[0], this.target_pos[1]).classList.remove("target");
                        _.plcl(target_temp[0], target_temp[1]).classList.add("target");
            
                        this.start_pos = start_temp;
                        this.target_pos = target_temp;
            
                        this.grid_clean = false;
            
                        if ((_.sivz(Kr[1])).value == "1") {
                            _.randomized_depth_first();
                        } else if ((_.sivz(Kr[1])).value == "2") {
                            _.kruskal_algorithm();
                        } else if ((_.sivz(Kr[1])).value == "3") {
                            _.prim_algorithm();
                        } else if ((_.sivz(Kr[1])).value == "4") {
                            _.wilson_algorithm();
                        } else if ((_.sivz(Kr[1])).value == "5") {
                            _.aldous_broder_algorithm();
                        } else if ((_.sivz(Kr[1])).value == "6") {
                            _.recursive_division();
                        }
                    };
            
                    (function() {
                        window.setTimeout(_.gen(), 0);
                    })();
                } catch (err) {
                    console.info(err);
                }
            })(this.gref_)
        }());
    }, {}],
    2: [function(t, e, n) {
        "use strict";

        Object.defineProperty(n, "__esModule", {
            value: !0
        });

        var o = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1,
                        o.configurable = !0,
                        "value" in o && (o.writable = !0),
                        Object.defineProperty(t, o.key, o)
                    }
                }
                return function(e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(),
            i = function() {
                function t() {
                    !function(t, e) {
                        if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function")
                    }(this, t)
                }
                return o(t, [{
                    key: "sendHttpRequest",
                    value: function(method, url) {
                        const promise = new Promise((resolve, reject) => {
                            const xhr = new XMLHttpRequest();
                            xhr.open(method, url);
                            xhr.responseType = 'json';
                            xhr.onload = () => {
                                if (xhr.status == 200) {
                                    resolve(xhr);
                                } else {
                                    reject(xhr);
                                }
                            }
                            xhr.onerror = () => {
                                reject('Something went wrong !');
                            }
                            xhr.send();
                        });
                        return promise;
                    }
                }]), t
            }();
        n.default = i
    }, {}],
    3: [function(t, e, n) {
        "use strict";
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        let h = o(t("/lib/XMLHttpRequest"));
        let C = new h.default;
    }, {
        "/lib/XMLHttpRequest" : 2
    }]
}, {}, [1, 3]);