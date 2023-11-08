#!/usr/bin/env python
# coding: utf-8

# In[51]:


import pandas as pd 
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


# In[52]:


df=pd.read_csv('D:\Data Project/hotel_booking.csv')


# In[53]:


df.head()


# In[54]:


df.tail(10)


# In[55]:


df.shape


# In[56]:


df.columns


# In[57]:


df.info()


# In[58]:


print(df.isnull().sum())


# In[59]:


print(df.describe())


# In[60]:


mode_hotel = df['hotel'].mode().iloc[0]
print("Mode Hotel:", mode_hotel)


# # Data Visualization

# In[61]:


plt.figure(figsize=(8, 6))
sns.histplot(df['lead_time'], bins=30, kde=True)
plt.title('Distribution of Lead Time')
plt.xlabel('Lead Time')
plt.ylabel('Frequency')
plt.show()


# In[62]:


plt.figure(figsize=(8, 6))
sns.countplot(df, x='hotel')
plt.title('Number of Bookings by Hotel Type')
plt.xlabel('Hotel Type')
plt.ylabel('Count')
plt.show()


# In[63]:


plt.figure(figsize=(8, 6))
sns.boxplot(x='is_canceled', y='lead_time', data=df)
plt.title('Canceled Bookings vs Lead Time')
plt.xlabel('Canceled')
plt.ylabel('Lead Time')
plt.show()


# In[64]:


plt.figure(figsize=(8, 6))
sns.countplot(df, x='hotel', hue='is_canceled')
plt.title('Cancellations by Hotel Type')
plt.xlabel('Hotel Type')
plt.ylabel('Count')
plt.show()


# In[65]:


df.drop(['company','agent'], axis = 1, inplace = True)
df.dropna(inplace = True)


# In[66]:


cancelled_perc = df['is_canceled'].value_counts(normalize = True)
cancelled_perc


# In[67]:


plt.figure(figsize = (5,4))
plt.title('Reservation status count')
plt.bar(['Not canceled','Canceled'],df['is_canceled'].value_counts(),edgecolor = 'k')
plt.show()


# In[68]:


from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


# In[69]:


df


# In[70]:


print(df.columns)


# In[71]:


from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder


# In[72]:


# Calculate cancellation rate
cancellation_rate = (df['is_canceled'].sum() / len(df)) * 100
print(f"Cancellation Rate: {cancellation_rate:.2f}%")


# In[73]:


# Calculate average lead time
average_lead_time = df['lead_time'].mean()
print(f"Average Lead Time: {average_lead_time:.2f} days")


# In[74]:


# Calculate occupancy rate
occupied_rooms = df[df['is_canceled'] == 0]['hotel'].count()
total_rooms = len(df)
occupancy_rate = (occupied_rooms / total_rooms) * 100
print(f"Occupancy Rate: {occupancy_rate:.2f}%")


# In[75]:


# Calculate average daily rate
average_daily_rate = df['adr'].mean()
print(f"Average Daily Rate (ADR): ${average_daily_rate:.2f}")


# In[76]:


# Calculate revenue
revenue = (df['stays_in_weekend_nights'] + df['stays_in_week_nights']) * df['adr']
total_revenue = revenue.sum()
print(f"Total Revenue: ${total_revenue:.2f}")


# In[77]:


# Group data by booking channel and count bookings
booking_channel_performance = df['distribution_channel'].value_counts()
print("Booking Channel Performance:")
print(booking_channel_performance)


# In[78]:


# Calculate percentage of repeat guests
repeat_guests = df['is_repeated_guest'].sum()
total_guests = len(df)
percentage_repeat_guests = (repeat_guests / total_guests) * 100
print(f"Percentage of Repeat Guests: {percentage_repeat_guests:.2f}%")


# In[79]:


from sklearn.model_selection import train_test_split

X = df.drop(['is_canceled'], axis=1)  # Features
y = df['is_canceled']  # Target variable

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# In[80]:


from sklearn.linear_model import LogisticRegression

columns_to_encode = ['hotel', 'arrival_date_month', 'meal', 'country', 'market_segment', 'distribution_channel', 'reserved_room_type', 'assigned_room_type', 'deposit_type', 'customer_type']
X_train_encoded = pd.get_dummies(X_train, columns=columns_to_encode, drop_first=True)
X_test_encoded = pd.get_dummies(X_test, columns=columns_to_encode, drop_first=True)


# In[81]:


# One-hot encode 'reservation_status'
X_train_encoded = pd.get_dummies(X_train_encoded, columns=['reservation_status'], drop_first=True)
X_test_encoded = pd.get_dummies(X_test_encoded, columns=['reservation_status'], drop_first=True)


# In[82]:


df.hist(bins=20, figsize=(15, 10))
plt.show()

corr_matrix = df.corr()
plt.figure(figsize=(12, 8))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt=".2f")
plt.show()


# In[83]:


data = {
    'hotel': ['Resort Hotel', 'Resort Hotel', 'Resort Hotel', 'Resort Hotel', 'Resort Hotel'],
    'is_canceled': [0, 0, 0, 0, 0],
    'lead_time': [342, 737, 7, 13, 14],
    'arrival_date_year': [2015, 2015, 2015, 2015, 2015],
    'arrival_date_month': ['July', 'July', 'July', 'July', 'July'],
    # ... other columns ...
}

df = pd.DataFrame(data)

# Create a mapping from month names to numeric values
month_to_numeric = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12
}

# Use the map function to replace month names with numeric values
df['arrival_date_month'] = df['arrival_date_month'].map(month_to_numeric)

# Now, the 'arrival_date_month' column contains numeric values from 1 to 12
print(df)


# In[101]:


from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import OneHotEncoder
import pandas as pd

# Assuming 'df' is your dataset
# Separate the target variable ('is_canceled') from the features
X = df.drop(['is_canceled'], axis=1)
y = df['is_canceled']

# Identify categorical columns
categorical_columns = X.select_dtypes(include=['object']).columns

# Initialize an empty DataFrame to store the one-hot encoded features
X_encoded = pd.DataFrame()

# Perform one-hot encoding for each categorical column
encoder = OneHotEncoder(sparse=False, drop='first')
for col in categorical_columns:
    encoded_col = encoder.fit_transform(X[[col]])
    # Get the feature names for this column
    feature_names = encoder.get_feature_names_out([col])
    encoded_col_df = pd.DataFrame(encoded_col, columns=feature_names)
    X_encoded = pd.concat([X_encoded, encoded_col_df], axis=1)

# Drop the original categorical columns and concatenate the encoded ones
X = pd.concat([X.drop(categorical_columns, axis=1), X_encoded], axis=1)

# Handle missing values (if any)
X.fillna(0, inplace=True)  # You can choose an appropriate strategy for filling missing values

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the Random Forest Classifier
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Make predictions and calculate accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy}')











# In[102]:


lr_model=LinearRegression()
lr_model.fit(X_train,Y_train)


# In[103]:


Y_pred=lr_model.predict(X_test)
score_lr=round(r2_score(Y_test,Y_pred)*100,2)
score_lr


# In[104]:


plt.scatter(Y_test,Y_pred)
plt.xlabel('Actual')
plt.ylabel('Predicted')
plt.title("Actual Vs Predicted")
plt.show()


# In[105]:


sns.regplot(x=Y_test,y=Y_pred,color ='green')
plt.xlabel('Actual')
plt.ylabel('Predicted')
plt.title("Actual Vs Predicted")
plt.show()


# In[106]:


from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor(n_estimators=100, random_state=42)

model.fit(X_train, Y_train)
y_predict=model.predict(X_test)
score_rf=round(r2_score(Y_test,y_predict)*100,2)
score_rf


# In[114]:


X = df[['lead_time']]
y = df['arrival_date_year']

# Split the data into a training set and a testing set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a Linear Regression model and fit it to the data
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate Mean Squared Error (MSE) and R-squared (R2) Score
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error (MSE): {mse}")
print(f"R-squared (R2) Score: {r2}")


# In[123]:


from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import r2_score

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, df['arrival_date_year'], test_size=0.2, random_state=42)

# Initialize the Decision Tree Regressor model
DT_Model = DecisionTreeRegressor()

# Train the model on the training data
DT_Model.fit(X_train, y_train)

# Make predictions on the test data
y_predict = DT_Model.predict(X_test)

# Evaluate the model using R-squared (R2) score
score_dtr = round(r2_score(y_test, y_predict) * 100, 2)

print(f'R-squared (R2) Score: {score_dtr}')


# In[127]:


from sklearn.ensemble import ExtraTreesRegressor

# Replace 'Y' with the actual target variable from your dataset
target_variable = 'arrival_date_year'

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, df[target_variable], test_size=0.2, random_state=42)

# Initialize the Extra Trees Regressor model with a higher number of estimators
ET_Model = ExtraTreesRegressor(n_estimators=500)

# Train the model on the training data
ET_Model.fit(X_train, y_train)

# Get feature importances
feature_importance = ET_Model.feature_importances_

# Normalize feature importances to a 0-100 scale, handling zero values
max_importance = feature_importance.max()
if max_importance == 0.0:
    feature_importance = 0.0 * feature_importance  # Set all importances to zero
else:
    feature_importance = 100.0 * (feature_importance / max_importance)

# Match feature importances to feature names
feature_names = X.columns

# Create a DataFrame to display feature names and their importance
feature_importance_df = pd.DataFrame({'Feature': feature_names, 'Importance': feature_importance})

# Sort features by importance
feature_importance_df = feature_importance_df.sort_values(by='Importance', ascending=False)

# Plot feature importance
plt.figure(figsize=(10, 6))
plt.barh(feature_importance_df['Feature'], feature_importance_df['Importance'])
plt.xlabel('Feature Importance (Normalized to 0-100)')
plt.title('Feature Importance for Extra Trees Regressor Model')
plt.show()


# In[128]:


importance = ET_Model.feature_importances_

for i,v in enumerate(importance):
    print('Feature: %0d, Score: %.5f' % (i,v))


# In[97]:


ET_Model = ExtraTreesRegressor(n_estimators=500)

# Train the model on the training data
ET_Model.fit(X_train, Y_train)

# Get feature importances
importance = pd.Series(ET_Model.feature_importances_, index=X.columns)

# Plot the top 8 important features
top_8_features = importance.nlargest(8)
top_8_features.plot(kind='barh', colormap='viridis')
plt.xlabel('Feature Importance')
plt.title('Top 8 Feature Importance for Extra Trees Regressor Model')
plt.show()


# In[133]:


from sklearn.linear_model import LinearRegression
model_lr = LinearRegression()

# Train the model on the training data
model_lr.fit(X_train, y_train)

# Make predictions
y_pred_lr = model_lr.predict(X_test)

# Create a Linear Regression model
model_lr = LinearRegression()

# Train the model on the training data
model_lr.fit(X_train, y_train)

# Make predictions
y_pred_lr = model_lr.predict(X_test)


# In[134]:


X = df[['lead_time', 'arrival_date_year']]
y = df['is_canceled']

# Split the data into a training set and a testing set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and fit the linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate the mean squared error and R-squared score
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Mean Squared Error (MSE):", mse)
print("R-squared (R2) Score:", r2)


# In[136]:


df.fillna(df.mean(), inplace=True)


# In[ ]:





# In[ ]:




