/*
 * knights.cpp
 *
 *  Created on: Oct 15, 2018
 *      Author: brand
 */
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

struct Point {
    int row;
    int col;
    Point() : row(0), col(0) {};
    Point(int x, int y) : row(x), col(y) {}
    bool operator<(const Point& other) const {
        return row < other.row ||
              (row == other.row && col < other.col);
    }
};

// Input: a row, col position on an 8x8 chessboard of a knight
// Output: a vector of row, col positions that the knight could move to
// on a chessboard.
std::vector<Point> moves;
std::vector<Point> result;
std::vector<Point> getKnightMoves(const Point& pos) {
	Point x (pos.row, pos.col);
	Point upL (pos.row + 2, pos.col - 1);
	Point upR (pos.row + 2, pos.col + 1);
	Point downR (pos.row - 2, pos.col + 1);
	Point downL (pos.row - 2, pos.col - 1);
	Point Rup (pos.row + 1, pos.col + 2);
	Point Rdown (pos.row - 1, pos.col + 2);
	Point Ldown (pos.row - 1, pos.col -2);
	Point Lup (pos.row + 1, pos.col -2);
	moves.push_back(upL);
	moves.push_back(upR);
	moves.push_back(downR);
	moves.push_back(downL);
	moves.push_back(Rup);
	moves.push_back(Rdown);
	moves.push_back(Ldown);
	moves.push_back(Lup);

	for(Point i: moves) {
		if((i.row <= 7 && i.row >= 0) && (i.col <= 7 && i.col >= 0)) {
			result.push_back(i);
		}
	}

			return result;
}


// Main function for parsing input and displaying output
// You should not have to change this in your final solution
int main(int argc, char** argv) {
    if (argc < 3) {
        std::cout << "usage: " << argv[0] << " row col\n";
        return 1;
    }
    const int row = std::stoi(argv[1]);
    const int col = std::stoi(argv[2]);
    std::vector<Point> result = getKnightMoves(Point(row, col));
    std::sort(result.begin(), result.end());
    for (size_t i = 0; i < result.size(); ++i) {
        const Point& elem = result[i];
        std::cout << elem.row << ", " << elem.col << '\n';
    }
    return 0;
}




