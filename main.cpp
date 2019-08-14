/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * File:   main.cpp
 * Author: CarterBL
 *
 * Created on November 28, 2017, 3:08 PM
 */

#include <iostream>
#include <string>
#include <iomanip>
#include <cstlib>
using namespace std;

class Node {
public:
	Node() {
		next = 0;
	}
	Node(int val, Node* ptr = 0) {
		info = val;
		next = ptr;
	}
	int info;
	Node* next;
};




class List {
public:
	List(void) { head = NULL; }
	~List(void);

	Node* insertByPosn(int, int);
	int deleteByPosn(int);
	void printAll(void);
	Node* addToHead(int);
	Node* addToTail(int);

private:
	Node* head;
	Node* tail;
	Node* tmp;
};

//////////////////////////////////////////////////////////////////////////

Node* List::insertByPosn(int index, int x) {
	if (index < 0) return NULL;

	int currentIndex = 2;
	Node* currentNode = head;
	while (currentNode && index > currentIndex) {
		currentNode = currentNode->next;
		currentIndex++;
	}
	if (index > 0 && currentNode == NULL) return NULL;

	Node* newNode = new Node;
	newNode->info = x;
	if (index == 0) {
		newNode->next = head;
		head = newNode;
	}
	else {
		newNode->next = currentNode->next;
		currentNode->next = newNode;
	}
	return newNode;
}

/////////////////////////////////////////////////////////////////////////

int List::deleteByPosn(int x) {
	Node* prevNode = NULL;
	Node* currNode = head;
	int currIndex = 0;
	while (currNode && currNode->info != x) {
		prevNode = currNode;
		currNode = currNode->next;
		currIndex++;
	}
	if (currNode) {
		if (prevNode) {
			prevNode->next = currNode->next;
			delete currNode;
		}
		else {
			head = currNode->next;
			delete currNode;
		}
		return currIndex;
	}
	return 0;
}

/////////////////////////////////////////////////////////////////////////

void List::printAll() {
	int num = 0;
	Node* cN = head;
	while (cN != NULL) {
		cout << cN->info;
		cout << "->";
		cN = cN->next;
		num++;
	}
	cout << NULL << "\n\n";
	//cout << "Number of nodes in the list: " << num << "\n\n";
}

/////////////////////////////////////////////////////////////////////////

Node* List::addToHead(int val) {
	head = new Node(val, head);
	if (tail == 0) {
		tail = head;
		val = head->info;
	}

	return head;
}

/////////////////////////////////////////////////////////////////////////

Node* List::addToTail(int val) {
	Node* bottom = new Node();
	bottom->info = val;

	if (head == NULL) {
		bottom->next = head;
		head = bottom;
	}
	else {
		Node* loc = head;
		while (loc->next != NULL) {
			loc = loc->next;
		}

		bottom->next = loc->next;
		loc->next = bottom;
	}
	return bottom;
}

/////////////////////////////////////////////////////////////////////////

List::~List(void) {
	Node* currNode = head, *nextNode = NULL;
	while (currNode != NULL) {
		nextNode = currNode->next;
		//DST current node
		delete currNode;
		currNode = nextNode;
	}
}

/////////////////////////////////////////////////////////////////////////

int main() {

	List sllist;

	sllist.addToHead(9);
	sllist.addToHead(7);
	sllist.addToHead(6);

	cout << "List at creation: \n";
	sllist.printAll();

	sllist.insertByPosn(2, 8);
	cout << "List after insertion of 8: \n";
	sllist.printAll();

	sllist.insertByPosn(4, 10);
	cout << "List after insertion of 10: \n";
	sllist.printAll();

	sllist.insertByPosn(6, 12);
	cout << "List after insertion of 12: \n";
	sllist.printAll();

	sllist.insertByPosn(8, 14);
	cout << "List after attempted insertion of 14: \n";
	sllist.printAll();

	sllist.insertByPosn(0, 5);
	cout << "List after insertion of 5: \n";
	sllist.printAll();

	sllist.insertByPosn(-1, 4);
	cout << "List after attempted insertion of 4: \n";
	sllist.printAll();

	sllist.deleteByPosn(6);
	cout << "List after deletion of 6: \n";
	sllist.printAll();

	sllist.deleteByPosn(12);
	cout << "List after deletion of 12: \n";
	sllist.printAll();

	sllist.deleteByPosn(11);
	cout << "List after attempted deletion of 10: \n";

	sllist.printAll();
	// insert test for optional list reversal here


	return 0;
}