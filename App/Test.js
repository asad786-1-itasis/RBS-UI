import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';

const Test = () => {
  // Sample data for the AccordionList
  const [list] = useState([
    {key: '1', title: 'Accordion Item 1', content: 'Content for item 1'},
    {key: '2', title: 'Accordion Item 2', content: 'Content for item 2'},
    {key: '3', title: 'Accordion Item 3', content: 'Content for item 3'},
  ]);

  // Header function for the AccordionList
  const _head = (item, expanded) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{item.title}</Text>
      </View>
    );
  };

  // Body function for the AccordionList
  const _body = item => {
    return (
      <View style={styles.body}>
        <Text>{item.content}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Simple Collapsible Section */}
      <Collapse>
        <CollapseHeader>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Click here for a simple collapsible
            </Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.body}>
            <Text>Ta daa! This is the content of the collapsible section.</Text>
          </View>
        </CollapseBody>
      </Collapse>

      {/* Accordion List */}
      <Text style={styles.accordionTitle}>Accordion List:</Text>
      <AccordionList
        list={list}
        header={_head}
        body={_body}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    marginVertical: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 5,
  },
  accordionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Test;
