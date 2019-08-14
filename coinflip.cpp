/*Coin flip using BSM
* P(i|t,p)
* using binomial distribution template
*/

#include <iostream>
#include <random>
using namespace std;

//assume the coin is fair
int main() {
	const double p = 0.5;
	const double q = 1 - p;
	int flips;

	cout << "Enter number of coin flips (must be an integer): ";
	cin >> flips;

	//add in test for int
		cout << "Number of flips is out of range." << endl;
		default_random_engine generator;
		int results[10] = {};
		binomial_distribution <int> bsm(flips, p);

		//simulate flips
		for (int i = 0; i < flips; i++) {
			int prob = bsm(generator);
			cout << results[prob] << endl;
		}

		//print results
		for (int i = 0; i < 10; i++) {
			cout << "Probability for " << i << " flips is " << results[i] << endl;
		}
	return 0;
}