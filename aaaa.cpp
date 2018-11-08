/*
 * Waterjugpuzzle.cpp
 *
 *  Created on: Oct 4, 2018
 *      Author: Damon
 */


#include "Waterjugpuzzle.h"
#include <cctype>
#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream>
#include <iomanip>
#include <queue>


using namespace std;
struct State {
	int a, b, c;
	vector<string> directions;
	State(int _a, int _b, int _c) : a(_a), b(_b), c(_c) { }
	// String representation of state in tuple form.
	string to_string() {
		ostringstream oss;
		oss << "(" << a << ", " << b << ", " << c << ")";
		return oss.str();
	}

};

// Create global variables for the cap and goal states
State cap(0,0,0);
State goal(0,0,0);
void setCap(State c){
	cap = c;
}
State getCap() {
	return cap;
}
void setGoal(State g){
	goal = g;
}
State getGoal() {
	return goal;
}
bool isEqualStates(State s1, State s2){
	// Checks if a given state is equal to the goal state
	State one(s1.a,s1.b,s1.c);
	State two(s2.a, s2.b, s2.c);
	if (one.a == two.a && one.b == two.b && one.c == two.c){
		return true;
	}
	return false;
}

bool isGoal(State s){
	// Checks if a given state is equal to the goal state
	State one(s.a,s.b,s.c);
	State goal = getGoal();
	if (one.a == goal.a && one.b == goal.b && one.c == goal.c){
		return true;
	}
	return false;
}

State case1(State r){
	// Pour from C to A
	State cap = getCap();
	State result = r;
	if(result.a < cap.a && result.c>0){
		result.a += result.c;
		result.c -= result.c;
		if(result.a > cap.a){
			while(result.a!=cap.a){
				result.a -= 1;
				result.c += 1;
			}
		}
	}
	return result;
}

State case2(State r){
	// Pour from B to A
	State cap = getCap();
	State result = r;
	if(result.a < cap.a && result.b>0){
		result.a += result.b;
		result.b -= result.b;
		if(result.a > cap.a){
			while(result.a!=cap.a){
				result.a -= 1;
				result.b += 1;
			}
		}
	}
	return result;
}

State case3(State r){
	// Pour from C to B
	State cap = getCap();
	State result = r;
	if(result.b < cap.b && result.c>0){
		result.b += result.c;
		result.c -= result.c;
		if(result.b > cap.b){
			while(result.b!=cap.b){
				result.b -= 1;
				result.c += 1;
			}
		}
	}
	return result;
}

State case4(State r){
	// Pour from A to B
	State cap = getCap();
	State result = r;
	if(result.b < cap.b && result.a>0){
		result.b += result.a;
		result.a -= result.a;
		if(result.b > cap.b){
			while(result.b!=cap.b){
				result.b -= 1;
				result.a += 1;
			}
		}
	}
	return result;
}

State case5(State r){
	// Pour from B to C
	State cap = getCap();
	State result = r;
	if(result.c < cap.c && result.b>0){
		result.c += result.b;
		result.b -= result.b;
		if(result.c > cap.c){
			while(result.c!=cap.c){
				result.c -= 1;
				result.b += 1;
			}
		}
	}
	return result;
}

State case6(State r){
	// Pour from A to C
	State cap = getCap();
	State result = r;
	if(result.c < cap.c && result.a>0){
		result.c += result.a;
		result.a -= result.a;
		if(result.c > cap.c){
			while(result.c!=cap.c){
				result.c -= 1;
				result.a += 1;
			}
		}
	}
	return result;
}
bool *visited;
State check(0,0,0);
vector<State> find_solution(int c){
	State cap = getCap();
	bool **visited = new bool*[cap.a + 1]; //adjacency matrix used to keep track of seen states
		for (int i = 0; i <  + 1; ++i) {
			visited[i] = new bool[cap.b + 1];
			for (int j = 0; j < cap.c + 1; ++j) {
				visited[i][j] = false;
			}
		}
	int cCap = c;
	State initial(0,0,cCap);
	initial.directions.push_back("Initial state. " + initial.to_string());
	visited[initial.a][initial.b] = true;
	vector<State> v;
	queue<State> q;
	q.push(initial);
	while (!q.empty()) {
		State front = q.front();
		v.push_back(front);
		vector<State> next = {case1(front),case2(front),case3(front),case4(front),case5(front),case6(front)};
		/*for(State s: next){
			cout << s.to_string() << endl;
		}*/
		for (auto &s: next) {
			if(isGoal(s)){
				v.push_back(s);
				return v;
			}
			if(!visited[s]){
				visited[s] = true;
				q.push(s);
			}
		}
		q.pop();
	}
	return v;
}

vector<State> find_sol(int c){
	int cCap = c;
	int result;
	vector<State> z = find_solution(cCap);
	for(unsigned int i=0; i<z.size(); i++ ){
		if(isGoal(z[i])){
			result = i+1;
			break;
		}
	}
	for(int j=0; j<result;j++){
		cout << z[j].to_string() << endl;
	}
	return z;
}



int main(int argc, char * const argv[]){
	if(argc != 7){
		// Prints Usage if improper number of arguments
		cerr << "Usage: ./waterjugpuzzle <cap A> <cap B> <cap C> <goal A> <goal B> <goal C>"<< endl;
		return 1;
	}
	istringstream is1(argv[1]), is2(argv[2]), is3(argv[3]), is4(argv[4]), is5(argv[5]), is6(argv[6]);
	int capA, capB, capC, goalA, goalB, goalC;
	// Check for proper inputs in each jug using stringstream, otherwise print an error
	if(!(is1 >> capA) || capA<0){
		cerr << "Error: Invalid capacity '" << is1.str() << "' for jug A."  << endl;
		return 1;
	} if (!(is2 >> capB) || capB<0){
		cerr << "Error: Invalid capacity '" << is2.str() << "' for jug B."  << endl;
		return 1;
	} if (!(is3 >> capC) || capC<0){
		cerr << "Error: Invalid capacity '" << is3.str() << "' for jug C."  << endl;
		return 1;
	} if (!(is4 >> goalA)|| goalA<0){
		cerr << "Error: Invalid goal '" << is4.str() << "' for jug A."  << endl;
		return 1;
	} if (!(is5 >> goalB)|| goalB<0){
		cerr << "Error: Invalid goal '" << is5.str() << "' for jug B."  << endl;
		return 1;
	} if (!(is6 >> goalC) || goalC<0){
		cerr << "Error: Invalid goal '" << is6.str() << "' for jug C."  << endl;
		return 1;
	} if(capC == 0){
		// Capacity of JugC cannot equal 0
		cout << "Error: Invalid capacity '0' for jug C.";
		return 1;
	} if(goalA>capA){
		// If any of the goals are greater than it's cap, print proper error
		cerr << "Error: Goal cannot exceed capacity of jug A." << endl;
		return 1;
	} if(goalB>capB){
		cerr << "Error: Goal cannot exceed capacity of jug B." << endl;
		return 1;
	} if(goalC>capC) {
		cerr << "Error: Goal cannot exceed capacity of jug C." << endl;
		return 1;
	} if(goalA+goalB+goalC != capC){
		// If sum of all goals is greater than the capacity of C, error
		cerr << "Error: Total gallons in goal state must be equal to the capacity of jug C." << endl;
		return 1;
	}
	State cap(capA,capB,capC);
	State goal(goalA,goalB,goalC);
	setCap(cap);
	setGoal(goal);
	vector<State> result = find_sol(capC);
	for(State s: result){
		cout << s.to_string() << endl;
	}
	if (true){
		cout<< "made it" << endl;
		//display_solution(cap, goal);
	} else {
		cout << "No solution." << endl;
	}
	return 0;


}
