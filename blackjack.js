(() => {
  const suits = [
    { key: 'clubs', label: 'Clubs' },
    { key: 'diamonds', label: 'Diamonds' },
    { key: 'hearts', label: 'Hearts' },
    { key: 'spades', label: 'Spades' }
  ];

  const ranks = [
    { key: 'ace', label: 'Ace', shortLabel: 'A', value: 11, isAce: true, file: (suit) => `ace_of_${suit}.png` },
    { key: '2', label: 'Two', shortLabel: '2', value: 2, file: (suit) => `2_of_${suit}.png` },
    { key: '3', label: 'Three', shortLabel: '3', value: 3, file: (suit) => `3_of_${suit}.png` },
    { key: '4', label: 'Four', shortLabel: '4', value: 4, file: (suit) => `4_of_${suit}.png` },
    { key: '5', label: 'Five', shortLabel: '5', value: 5, file: (suit) => `5_of_${suit}.png` },
    { key: '6', label: 'Six', shortLabel: '6', value: 6, file: (suit) => `6_of_${suit}.png` },
    { key: '7', label: 'Seven', shortLabel: '7', value: 7, file: (suit) => `7_of_${suit}.png` },
    { key: '8', label: 'Eight', shortLabel: '8', value: 8, file: (suit) => `8_of_${suit}.png` },
    { key: '9', label: 'Nine', shortLabel: '9', value: 9, file: (suit) => `9_of_${suit}.png` },
    { key: '10', label: 'Ten', shortLabel: '10', value: 10, file: (suit) => `10_of_${suit}.png` },
    { key: 'jack', label: 'Jack', shortLabel: 'J', value: 10, file: (suit) => `jack_of_${suit}2.png` },
    { key: 'queen', label: 'Queen', shortLabel: 'Q', value: 10, file: (suit) => `queen_of_${suit}2.png` },
    { key: 'king', label: 'King', shortLabel: 'K', value: 10, file: (suit) => `king_of_${suit}2.png` }
  ];

  const state = {
    deck: [],
    playerHand: [],
    dealerHand: [],
    isRoundActive: false,
    isPlayerStanding: false
  };

  const dealButton = document.getElementById('deal-button');
  const hitButton = document.getElementById('hit-button');
  const standButton = document.getElementById('stand-button');
  const resetButton = document.getElementById('reset-button');
  const playerCardsEl = document.getElementById('player-cards');
  const dealerCardsEl = document.getElementById('dealer-cards');
  const playerTotalEl = document.getElementById('player-total');
  const dealerTotalEl = document.getElementById('dealer-total');
  const messageEl = document.getElementById('game-message');

  if (!dealButton || !hitButton || !standButton || !resetButton) {
    return;
  }

  dealButton.addEventListener('click', startRound);
  hitButton.addEventListener('click', playerHit);
  standButton.addEventListener('click', playerStand);
  resetButton.addEventListener('click', resetTable);

  resetTable();

  function startRound() {
    resetHands();
    state.deck = buildDeck();
    shuffle(state.deck);
    state.isRoundActive = true;
    state.isPlayerStanding = false;

    state.playerHand.push(drawCard());
    state.dealerHand.push(drawCard());
    state.playerHand.push(drawCard());
    state.dealerHand.push(drawCard(true));

    renderHands();
    updateTotals();
    updateButtons();

    const playerTotal = calculateHandValue(state.playerHand);
    const dealerTotal = calculateHandValue(state.dealerHand);

    if (playerTotal === 21 && dealerTotal === 21) {
      endRound("It's a push! Both hit blackjack.");
    } else if (playerTotal === 21) {
      endRound('Blackjack! You win.');
    } else if (dealerTotal === 21) {
      revealDealerHand();
      endRound('Dealer has blackjack. You lose.');
    } else {
      setMessage('You have been dealt two cards. Hit or stand?');
    }
  }

  function playerHit() {
    if (!state.isRoundActive || state.isPlayerStanding) {
      return;
    }

    state.playerHand.push(drawCard());
    renderHands();
    const playerTotal = calculateHandValue(state.playerHand);
    updateTotals();

    if (playerTotal > 21) {
      endRound('Bust! You exceeded 21. Dealer wins.');
    } else if (playerTotal === 21) {
      playerStand();
    } else {
      setMessage('Card added. Decide whether to hit again or stand.');
    }
  }

  function playerStand() {
    if (!state.isRoundActive) {
      return;
    }

    state.isPlayerStanding = true;
    revealDealerHand();
    renderHands();
    dealerTurn();
  }

  function dealerTurn() {
    let dealerTotal = calculateHandValue(state.dealerHand);
    const playerTotal = calculateHandValue(state.playerHand);

    while (dealerTotal < 17) {
      state.dealerHand.push(drawCard());
      dealerTotal = calculateHandValue(state.dealerHand);
    }

    renderHands();
    updateTotals();

    if (dealerTotal > 21) {
      endRound('Dealer busts! You win.');
      return;
    }

    if (dealerTotal > playerTotal) {
      endRound('Dealer stands with a higher total. You lose.');
    } else if (dealerTotal < playerTotal) {
      endRound('You stand tall! Your total beats the dealer.');
    } else {
      endRound("Push! It's a tie.");
    }
  }

  function endRound(message) {
    state.isRoundActive = false;
    state.isPlayerStanding = true;
    revealDealerHand();
    renderHands();
    updateTotals();
    updateButtons();
    setMessage(message);
  }

  function resetTable() {
    resetHands();
    state.deck = [];
    state.isRoundActive = false;
    state.isPlayerStanding = false;
    renderHands();
    updateTotals();
    updateButtons();
    setMessage('Press Deal to start a round.');
  }

  function resetHands() {
    state.playerHand = [];
    state.dealerHand = [];
  }

  function drawCard(faceDown = false) {
    if (state.deck.length === 0) {
      state.deck = buildDeck();
      shuffle(state.deck);
    }
    const card = state.deck.pop();
    return { ...card, faceDown };
  }

  function revealDealerHand() {
    state.dealerHand = state.dealerHand.map((card) => ({ ...card, faceDown: false }));
  }

  function buildDeck() {
    const deck = [];
    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        deck.push({
          suit: suit.label,
          suitKey: suit.key,
          rank: rank.label,
          shortRank: rank.shortLabel,
          value: rank.value,
          isAce: Boolean(rank.isAce),
          image: `cards/${rank.file(suit.key)}`
        });
      });
    });
    return deck;
  }

  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  function calculateHandValue(hand) {
    let total = 0;
    let aceCount = 0;

    hand.forEach((card) => {
      total += card.value;
      if (card.isAce) {
        aceCount += 1;
      }
    });

    while (total > 21 && aceCount > 0) {
      total -= 10;
      aceCount -= 1;
    }

    return total;
  }

  function updateTotals() {
    const playerTotal = state.playerHand.length ? calculateHandValue(state.playerHand) : 0;
    const dealerTotal = state.dealerHand.length ? calculateHandValue(state.dealerHand) : 0;
    const dealerHasHidden = state.dealerHand.some((card) => card.faceDown);

    playerTotalEl.value = playerTotal || 0;
    dealerTotalEl.value = dealerHasHidden && state.isRoundActive && !state.isPlayerStanding ? '??' : dealerTotal || 0;
  }

  function updateButtons() {
    dealButton.disabled = state.isRoundActive;
    hitButton.disabled = !state.isRoundActive || state.isPlayerStanding;
    standButton.disabled = !state.isRoundActive || state.isPlayerStanding;
  }

  function renderHands() {
    renderHand(playerCardsEl, state.playerHand);
    renderHand(dealerCardsEl, state.dealerHand);
  }

  function renderHand(container, hand) {
    container.innerHTML = '';

    if (hand.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No cards yet.';
      emptyMessage.className = 'empty-hand';
      container.appendChild(emptyMessage);
      return;
    }

    hand.forEach((card) => {
      const cardEl = document.createElement('img');
      cardEl.className = 'bj-card';
      cardEl.src = card.faceDown ? 'back.png' : card.image;
      cardEl.alt = card.faceDown ? 'Face-down card' : `${card.rank} of ${card.suit}`;
      container.appendChild(cardEl);
    });
  }

  function setMessage(text) {
    messageEl.value = text;
  }
})();
