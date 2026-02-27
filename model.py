import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle

# Load data
data = pd.read_csv('user_spending.csv')  # Change to your data source
# Preprocess data
data['date'] = pd.to_datetime(data['date'])
data['day_of_week'] = data['date'].dt.dayofweek
data['month'] = data['date'].dt.month
# Features and target variable
X = data[['day_of_week', 'month']]
y = data['amountSpent']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
model = LinearRegression()

# Train model
model.fit(X_train, y_train)

# Save model
with open('spending_model.pkl', 'wb') as file:
    pickle.dump(model, file)