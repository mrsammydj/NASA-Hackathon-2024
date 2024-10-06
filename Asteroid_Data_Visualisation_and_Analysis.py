#!/usr/bin/env python
# coding: utf-8

# In[7]:


import pandas as pd
import plotly.express as px
import plotly.graph_objs as go
from plotly.subplots import make_subplots
import plotly.subplots as sp
import numpy as np


# In[3]:


data = pd.read_csv('sbdb_query_results.csv')


# In[11]:


data.head()


# # Descriptive Statistics & Preliminary Data Exploration

# In this introductory part, we will be looking at how different features asteroids have behave and correlate with one another. 
# How we are going to do it is pretty straight forward; we have lots of graphs and diagrams that have the necessary information visualized to make it easier for us to understand the data.

# In[22]:


fig1 = px.scatter(data,
                  x='a',
                  y='e',
                  color='pha',
                  title='Phase Space Plot (Semi-Major Axis vs Eccentricity)',
                  labels={'a': 'Semi-Major Axis (AU)', 'e': 'Eccentricity'},
                  color_discrete_sequence = ['darkblue'])
fig1.update_layout(width=800,height=500)


# In this first scatter plot, we are seeing how Eccentricity and Semi-Major Axis data look compared to each other. Before we go any further, we should briefly define what these terms actually mean:
# - Eccentricity: Eccentricity is a number that tells us how "stretched out" or "squished" an orbit is. If an orbit is perfectly circular, its eccentricity is 0. If the orbit is more like an oval (or ellipse), its value is between 0 and 1. The closer the value is to 1, the more stretched the orbit is. For example, planets have low eccentricities, while comets can have high eccentricities, making their orbits very elongated.
# 
# - Semi-Major Axis (AU): The semi-major axis is half the longest diameter of an ellipse (an oval shape). In space, we often measure this distance in Astronomical Units (AU), where 1 AU is the average distance from the Earth to the Sun, about 93 million miles (150 million kilometers). So, if a planet has a semi-major axis of 2 AU, it is twice as far from the Sun as Earth is.
# 
# It is clear that the Eccentricity data is spread between the values of 0 and 1, which supports the definition we just learnt. Since we also know what this number being close to 0 or 1 means, we could make a rough estimation on the overall shape of a particular asteroid.
# 
# There is one asteroid that catches our eye with how far it is located on the plot from the majority. It appears that it is also pretty far away from us on Earth; we will get to which asteroid it is and it's features in a minute.

# In[33]:


fig2 = px.scatter(data,
                  x='a',
                  y='i',
                  title='Inclination vs Semi-Major Axis',
                  labels={'a': 'Semi-Major Axis (AU)', 'i': 'Inclination'},
                  color_discrete_sequence=['darkred'])

fig2.update_layout(width=1000,height=500)


# Let's define the new term we see, Inclination, real quick:
# 
# - Inclination is the angle between the orbit of a planet (or asteroid) and a flat surface called the "ecliptic plane," which is like a big disk that includes the orbits of most planets. If you think of the ecliptic plane as the ground, inclination tells us how steeply the orbit goes up or down from that ground. An inclination of 0 degrees means the orbit is flat on the ecliptic plane, while a higher angle means it’s tilted up or down.
# 
# First thing that comes to mind is how similar this looks to the previous plot. Of course this time inclination is measured between 0-80 degrees. We see that exceptional one on the right side again. Now that we saw it's fundamental information, let us take a closer look on this eye-catching asteroid.

# This is the asteroid 1999 XS35 (Apollo[NEO,PHA]) with the SPKID: 3024715.
# 
# In the block below, we can see where it stands in terms of it's other attributes.

# In[19]:


xs35 = data[data['a'] > 15]
xs35_melted = xs35.melt(var_name='Attributes', value_name='Values', ignore_index=False)
xs35_melted = xs35_melted[~xs35_melted['Attributes'].isin(['spkid', 'name', 'pha'])]
bar_fig_xs35 = px.bar(xs35_melted, x='Attributes', y='Values',
                        color='Attributes',
                        title='Attributes of the Asteroid 1999 XS35',
                        labels={'x': 'Attributes', 'y': 'Values'},
                        log_y=True) 

bar_fig_xs35.show()


# In[34]:


fig3 = px.scatter(data,
                  x='e',
                  y='i',
                  title='Eccentricity vs Inclination',
                  labels={'e': 'Eccentricity', 'i': 'Inclination'},
                  color_discrete_sequence=['darkgreen'])

fig3.show()


# Perhaps it'd give us a better perspective to examine this relation in a polar-scatter plot

# In[35]:


polar_fig = px.scatter_polar(data, r='e', theta='i',
                             title="Inclination vs Eccentricity",
                             labels={'e': 'Eccentricity', 'i': 'Inclination (degrees)'},
                             color='e',
                             size='a',
                             hover_data=['name'])

polar_fig.show()


# Each point in this plot represents an asteroid, where the radial distance from the center corresponds to its eccentricity, and the angle represents its inclination. Observing the distribution of these points helps us identify patterns. For instance, asteroids with higher eccentricity often show a wider range of inclinations, suggesting a more varied orbital behavior in this region of the solar system.

# In[1]:


fig4 = px.scatter(data,
                  x='e',
                  y='ma',
                  title='Eccentricity vs Mean Anomaly',
                  labels={'e': 'Eccentricity', 'ma': 'Mean Anomaly'},
                  color_discrete_sequence=['maroon'])

fig4.show()


# - Mean Anomaly (ma): This parameter indicates the position of an asteroid in its orbit at a specific time, expressed as an angle. It helps astronomers understand where an asteroid is located along its orbital path.
# 
# Each point in this scatter plot represents a unique asteroid, showing how its eccentricity relates to its mean anomaly. If we observe any clusters or trends in this plot, it may suggest that certain groups of asteroids share similar orbital characteristics or behaviors. This insight can be crucial for predicting their future positions and movements.

# In[37]:


fig5 = px.scatter(data,
                  x='e',
                  y='epoch',
                  title='Eccentricity vs Epoch',
                  labels={'e': 'Eccentricity', 'epoch': 'Epoch'},
                  color_discrete_sequence=['black'])

fig5.show()


# As we did before, let's quickly define what Epoch is and then discuss what this plot tell us:
# 
# - The epoch of oscillation refers to a specific point in time when an object in space (like an asteroid) is being observed or studied. It's like saying, "At this moment, what is happening with the object?" Scientists use this point in time to calculate other things about the object's orbit, making it easier to predict where it will be in the future.
# 
# Each point in this scatter plot indicates an asteroid’s eccentricity at a particular epoch. Observing the trends or distribution of points can help identify if there are specific epochs where certain eccentricity values are more prevalent. Here we see a straight line formation at the top of the diagram. This simply means that a vast majority of the asteroids' epoch parameter is/above the value of 2.46M. This information can be valuable in understanding how the orbits of asteroids evolve over time and whether certain periods exhibit distinct orbital characteristics.

# In[38]:


fig6 = px.scatter(data,
                  x='e',
                  y='om',
                  title='Eccentricity vs Longitude',
                  labels={'e': 'Eccentricity', 'om': 'Longitude of the Ascending Node'},
                  color_discrete_sequence=['yellow'])

fig6.show()


# - Longitude of the Ascending Node: The longitude of the ascending node is the angle that helps us find the point where an orbiting object (like a planet or asteroid) crosses the flat ecliptic plane from below to above. It’s like marking a spot on a map. This angle is measured from a reference direction (often the direction of the Sun) and tells us the specific place in the sky where the object is moving up through the ecliptic plane.
# 
# If there are clusters of points at specific longitudes with varying eccentricities, it may suggest that asteroids within those clusters share common orbital characteristics or are influenced by similar gravitational interactions.
# 
# Orbital Families: If specific groups of asteroids show similar eccentricities at certain longitudes, it may hint at their belonging to the same orbital family or belt (e.g., the main asteroid belt, Near-Earth Objects).
# 
# Orbital Dynamics: The relationship might highlight how gravitational forces from larger bodies (like planets) can affect the eccentricities of asteroids at different positions in their orbits.
# 
# In summary, a graph of eccentricity vs. longitude of the ascending node could provide valuable insights into the dynamic relationships of asteroids within our solar system. By interpreting the distribution and trends in the graph, researchers can make educated inferences about the behavior and interactions of these celestial bodies over time.

# In[39]:


fig7 = px.scatter(data,
                  x='e',
                  y='w',
                  title='Eccentricity vs Arg. of Perihelion',
                  labels={'e': 'Eccentricity', 'w': 'Argument of Perihelion'},
                  color_discrete_sequence=['blue'])

fig7.show()


# - Argument of Perihelion: The argument of perihelion is the angle that describes the position of an orbiting object at its closest point to the Sun, called perihelion. It’s measured from the ascending node (the point where the object crosses the ecliptic plane going up) to the perihelion point in the direction of the object's orbit. This helps astronomers understand not just how far the object is from the Sun at its closest, but also where exactly that close point is located in its orbit.
# 
# - Clusters of Points: If several asteroids cluster at specific values of the argument of perihelion with varying eccentricities, it may suggest that these bodies are influenced by similar gravitational forces or share a common orbital history.
# 
# - Spread of Data: A wide distribution across the graph can imply a diverse set of orbital characteristics, indicating a variety of evolutionary pathways and interactions for the asteroids represented.
# 
# - A potential correlation could exist if higher eccentricities are associated with specific ranges of the argument of perihelion. For instance, if asteroids with high eccentricity consistently show certain values for the argument of perihelion, this could point to underlying physical processes that govern their orbits.

# In[40]:


fig8 = px.scatter(data,
                  x='a',
                  y='ma',
                  title='Semi-Major Axis vs Mean Anomaly',
                  labels={'a': 'Semi-Major Axis', 'ma': 'Mean Anomaly'},
                  color_discrete_sequence=['cyan'])

fig8.show()


# In[41]:


fig9 = px.scatter(data,
                  x='a',
                  y='epoch',
                  title='Semi-Major Axis vs Epoch of Oscillation (Julian Day Form)',
                  labels={'a': 'Semi-Major Axis', 'epoch': 'Epoch of Oscillation'},
                  color_discrete_sequence=['orange'])

fig9.show()


# ## Individual Parameter Analysis

# In[30]:


fig_dist_e = px.histogram(data,
                    x='e',
                    title='Eccentricity Distribution',
                    labels={'e':'Eccentricity'},
                    nbins=70,)


# In[31]:


fig_dist_e.show()


# In[32]:


fig_dist_a = px.histogram(data,
                    x='a',
                    title='Semi-Major Axis',
                    labels={'a':'Semi-Major Axis'},
                    nbins=70,)
fig_dist_a.show()


# In[42]:


fig_dist_i = px.histogram(data,
                    x='i',
                    title='Inclination',
                    labels={'i':'Inclination'},
                    nbins=70,)
fig_dist_i.show()


# In[43]:


fig_dist_ma = px.histogram(data,
                    x='ma',
                    title='Mean Anomaly',
                    labels={'ma':'Mean Anomaly'},
                    nbins=70,)
fig_dist_ma.show()


# In[44]:


fig_dist_epoch = px.histogram(data,
                    x='epoch',
                    title='Epoch of Oscillation',
                    labels={'epoch':'Epoch of Oscillation'},
                    nbins=70,)
fig_dist_epoch.show()


# In[45]:


fig_dist_om = px.histogram(data,
                    x='om',
                    title='Longitude of the Ascending Node',
                    labels={'om':'Longitude of the Ascending Node'},
                    nbins=70,)
fig_dist_om.show()


# In[46]:


fig_dist_w = px.histogram(data,
                    x='w',
                    title='Argument of Perihelion',
                    labels={'w':'Argument of Perihelion'},
                    nbins=70,)
fig_dist_w.show()


# # Orbital Dynamics & Mechanics Analysis

# From here on out, we will be diving a bit deeper into the actual physics behind all these and analyse the correlations and information on orbital dynamics as well as mechanics

# In[28]:


G = 6.67430e-11  # Gravitational constant
M_sun = 1.989e30  # Mass of the Sun in kg
mu = G * M_sun

# Calculate specific orbital energy for each asteroid
data['orbital_energy'] = -mu / (2 * data['a'])

# Orbital energy vs semi-major axis
fig_orb_eng = px.scatter(data, x='a', y='orbital_energy', color='e',
                 title="Orbital Energy vs Semi-Major Axis",
                 labels={'a': 'Semi-Major Axis (AU)', 'orbital_energy': 'Orbital Energy (J/kg)'},
                 hover_data=['name'])
fig_orb_eng.show()


# - Orbital Energy (E): Orbital energy is a measure of the total energy of an object in its orbit and is typically expressed as a negative value for bound orbits. It encompasses both kinetic and potential energy, with lower (more negative) values indicating more tightly bound orbits. The total energy can be calculated using the formula: E = - (G*M*m)/(2a) where G is the gravitational constant, M is the mass of the central body, m is the mass of the orbiting body and a is the semi-major axis of the orbit.
# 
# - The relationship between orbital energy and the semi-major axis is generally expected to be inversely proportional. As the semi-major axis increases, the orbital energy becomes less negative (i.e., it increases). This indicates that objects with larger semi-major axes are less tightly bound to the central body and have more energy available to escape their gravitational influence. If the plot shows a linear trend, it could further confirm the expected relationship between the two variables, which we can see how stable the difference between asteroids here.
# 
# - If the graph contains values for orbital energy that are positive or approaching zero, these may indicate unbound orbits (hyperbolic trajectories) where the objects are not gravitationally bound to the Sun or central body. Most asteroids will exhibit negative energy values indicative of bound orbits.
# 
# - In terms of implicatoins for orbital dynamics; The relationship between orbital energy and semi-major axis can inform predictions about the stability of orbits. Objects with lower energy (more negative) and smaller semi-major axes might be more stable in their orbits, while those with higher energy might experience perturbations that alter their trajectories over time.

# In[29]:


def tisserand_parameter(a, e, i, a_J=5.2):
    return a_J/a + 2 * np.sqrt(a/a_J * (1 - e**2)) * np.cos(np.deg2rad(i))

# Calculate Tisserand parameter for each asteroid
data['T_J'] = tisserand_parameter(data['a'], data['e'], data['i'])

# Plot Tisserand parameter vs semi-major axis
fig_tisserand = px.scatter(data, x='a', y='T_J', color='e', 
                 title="Tisserand Parameter vs Semi-Major Axis",
                 labels={'a': 'Semi-Major Axis (AU)', 'T_J': 'Tisserand Parameter'},
                 hover_data=['name'])
fig_tisserand.show()


# - Tisserand Parameter (T): The Tisserand parameter is a dimensionless quantity that provides valuable information about the dynamics of a small body (like an asteroid) in relation to a larger body (like a planet). It is particularly useful for distinguishing the different types of orbits in the solar system. The parameter is defined as: T = ap/a + 2*cos(i)*sqrt((a/ap)*(1-e^^2)) where:
#        ap is the semi-major axis of the perturber (often the planet with the largest mass)
#        i is the inclination of the object's orbit
#        e is the eccentricity
# 
# - The relationship between the Tisserand parameter and the semi-major axis is significant because it can indicate the dynamical classification of an object. For example, Tisserand values can differentiate between asteroids that are primarily influenced by a planet's gravity and those that follow their own independent paths.
# 
# - Notably, the shapes of the plots for the Tisserand parameter and orbital energy when graphed against the semi-major axis are often mirrored across the x-axis. This symmetry can be insightful because it suggests a fundamental relationship between the energy dynamics and the Tisserand parameter, linking the energy states of orbits to their classifications under gravitational influences.

# In[11]:


theta = data['w']  # Argument of perihelion
r = data['e']      # Eccentricity


polar_fig = go.Figure(go.Scatterpolar(
    r=r,
    theta=theta,
    mode='markers',
    marker=dict(color=r, colorscale='Viridis', showscale=True),
))

polar_fig.update_layout(
    polar=dict(
        radialaxis=dict(visible=True),
    ),
    title="Orbital Precession (Argument of Perihelion vs Eccentricity)"
)

polar_fig.show()


# Here, we present a visualization of orbital precession for the asteroids, using a polar plot to depict how an asteroid's orbital plane shifts over time due to gravitational interactions.
# 
# - Orbital Precession: This refers to the gradual shift in the orientation of an asteroid's orbit, which can be influenced by factors such as the gravitational pull from other bodies.
# 
# - Understanding the Plot: The radial distances in this plot can give insights into how the shape and orientation of the asteroid's orbit change over time, providing a deeper understanding of the dynamics within the solar system.

# In[12]:


contour_fig = px.density_contour(data, x='a', y='e', z='i',
                                 title='Inclination vs Semi-Major Axis and Eccentricity',
                                 labels={'a': 'Semi-Major Axis (AU)', 'e': 'Eccentricity', 'i': 'Inclination (degrees)'})

contour_fig.update_traces(contours_coloring="heatmap")
contour_fig.show()


# In[13]:


correlation = data.corr()
fig_corr = px.imshow(correlation, 
                 title='Correlation Matrix Heatmap',
                 labels=dict(x='Orbital Parameters', y='Orbital Parameters', color='Correlation Coefficient'))
fig_corr.show()


# - One notable observation is the strong positive correlation between the semi-major axis (a) and orbital energy. This suggests that as the semi-major axis increases, the orbital energy also tends to increase, which aligns with the fundamental principles of orbital mechanics. Conversely, the eccentricity (e) shows a weaker correlation with orbital energy, indicating that changes in eccentricity have a less direct impact on the overall energy of the orbit.
# 
# - The inclination (i) and mean anomaly (M) exhibit a near-zero correlation, implying that these parameters vary independently of each other. This independence can be crucial for understanding the stability and orientation of an orbit, as changes in inclination do not necessarily affect the mean anomaly.
# 
# - Additionally, the epoch of oscillation (epoch) and the longitude of the ascending node (om) show a moderate positive correlation. This relationship might indicate that the timing of an orbit’s oscillation is somewhat linked to its orientation in space, providing insights into the long-term evolution of orbital paths

# In[14]:


fig_stat = sp.make_subplots(rows=2, cols=2,
                        subplot_titles=("Eccentricity", "Semi-Major Axis",
                                        "Inclination", "Mean Anomaly"))

# Eccentricity Violin Plot
fig_stat.add_trace(
    px.violin(data, y='e', x='pha', box=True, points='all').data[0],
    row=1, col=1
)

# Semi-Major Axis Violin Plot
fig_stat.add_trace(
    px.violin(data, y='a', x='pha', box=True, points='all').data[0],
    row=1, col=2
)

# Inclination Violin Plot
fig_stat.add_trace(
    px.violin(data, y='i', x='pha', box=True, points='all').data[0],
    row=2, col=1
)

# Mean Anomaly Violin Plot
fig_stat.add_trace(
    px.violin(data, y='ma', x='pha', box=True, points='all').data[0],
    row=2, col=2
)

# Update layout
fig_stat.update_layout(title_text='Statistical Comparison of Orbital Elements',
                  height=800, width=800)

# Show the figure
fig_stat.show()


# In[ ]:




