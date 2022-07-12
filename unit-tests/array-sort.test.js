describe('`[].sort()` sorts an array using each value as a string', function() {
  it('is a function on the array prototype', function() {
    const theType = 'function';
    assert.equal(theType, typeof [].sort);
  });
  describe('sorts characters', function() {
    it('in alphabetical order', function() {
      const sorted = ['b', 'a'].sort();
      assert.deepEqual(sorted, ['a', 'b']);
    });
    it('upper case characters come first', function() {
      const sorted = ['\u{61}', 'B', 'C'].sort();
      assert.deepEqual(sorted, ['B', '\u{61}', 'C'].sort());
    });
    it('depending on their position in the unicode table', function() {
      const sorted = ['+', '*', '(', ')'].sort();
      assert.deepEqual(sorted, ['(', ')', '*', '+']);
    });
    it('unicode characters depending on their code point', function() {
      const grinningFace = '\u{1F601}';
      const grinningEyes = '\u{1F602}';
      const withTears = '\u{1F603}';
      const smilies = [grinningEyes, grinningFace, withTears];
      assert.deepEqual(smilies.sort(), [grinningFace, '\u{1F602}', withTears]);
    });
  });
  describe('sorts strings', function() {
    it('considering the string from start to end', function() {
      const sortedResult = ['aa', 'Ba'].sort();
      assert.deepEqual(sortedResult, ['aa', 'Ba'].sort());
    });
    it('shorter strings go to front', function() {
      const balls = ['Ball', 'Balls', 'bald'];
      assert.deepEqual(balls, ['Ball', 'Balls', 'bald']);
    });
  });
  describe('sorts numbers as if they were strings', function() {
    it('`1` and `2` are sorted as expected', function() {
      const numbers = [2, 1, 5];
      assert.deepEqual(numbers.sort(), [1, 2, 5]);
    });
    it('see multi digit numbers as strings!', function() {
      const sortedNumbers = [1,2,11].sort();
      assert.deepEqual(sortedNumbers, [1, 2, 11].sort());
    });
  });
});

//this one is done and dustEd